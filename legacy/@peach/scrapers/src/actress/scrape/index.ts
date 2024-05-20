import { logScope } from '@peach/utils/src/logging';
import { head } from 'ramda';
import { FreeonesScraper } from '../sites/freeones';
import { TrannyOneScraper } from '../sites/trannyOne';
import { XcityScraper } from '../sites/xcity';
import { ActressScraper, ScrapeRequest, ScrapeResult } from '../type';
import { scrapeDetail } from './detail';
import { scrapeOverview } from './overview';

const allScrapers = [TrannyOneScraper, XcityScraper, FreeonesScraper];

const log = logScope('scrape-actress');

const scrapeOverviewAndProceedWithDetail =
  (scraper: ActressScraper) => (request: ScrapeRequest) => {
    if (!request.name) return Promise.reject();

    return scrapeOverview(scraper)(request.name).then(result => {
      if (result.alternatives?.length === 0) return Promise.reject();

      const singleAlternativeDetailUrl =
        result.alternatives.length === 1 && head(result.alternatives)?.detailUrl;

      if (!singleAlternativeDetailUrl) return result;
      return scrapeDetail(scraper)({ detailUrl: singleAlternativeDetailUrl });
    });
  };

export const scrape =
  (scraper: ActressScraper) =>
  (request: ScrapeRequest): Promise<ScrapeResult> => {
    if (
      (request.name && scraper.detail.nameToUrl) ||
      (request.detailUrl && scraper.detail.detailUrlMatches(request.detailUrl))
    ) {
      return scrapeDetail(scraper)(request).then(result =>
        Object.values(result.actress ?? {}).filter(v => !!v).length > 0
          ? result
          : scrapeOverviewAndProceedWithDetail(scraper)(request),
      );
    }

    return scrapeOverviewAndProceedWithDetail(scraper)(request);
  };

const scrapeAllForOverview = (request: ScrapeRequest) =>
  !request.name || request.detailUrl
    ? Promise.reject('Invalid request for overview')
    : Promise.all(allScrapers.map(scraper => scrapeOverview(scraper)(request.name))).then(
        results => ({
          alternatives: results.flatMap(r => r.alternatives),
        }),
      );

const scrapeFastestForDetail = (request: ScrapeRequest) =>
  Promise.any(
    allScrapers.map(scraper =>
      scrape(scraper)(request).then(result => {
        if (!result.actress) {
          log.info(`[${scraper.name}]: Scraper returned nothing.`);
          return Promise.reject();
        }
        log.info(
          `[${scraper.name}]: Scraper finished first with result: ${JSON.stringify(result)}`,
        );
        return result;
      }),
    ),
  );

export const scrapeAllScrapers = (request: ScrapeRequest): Promise<ScrapeResult> =>
  Promise.allSettled([scrapeAllForOverview(request), scrapeFastestForDetail(request)]).then(
    ([overviewResult, detailResult]) => {
      const overview = overviewResult.status === 'fulfilled' ? overviewResult.value : undefined;
      const detail = detailResult.status === 'fulfilled' ? detailResult.value : undefined;

      return detail ?? overview ?? { actress: undefined, alternatives: [] };
    },
  );
