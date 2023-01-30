import { logScope } from '@peach/utils/src/logging';
import { head } from 'ramda';
import { FreeonesScraper } from '../sites/freeones';
import { TrannyOneScraper } from '../sites/trannyOne';
import { XcityScraper } from '../sites/xcity';
import { ActressScraper, ScrapeRequest, ScrapeResult } from '../type';
import { scrapeDetail } from './detail';
import { scrapeOverview } from './overview';

const log = logScope('scrape-actress');

export const scrape =
  (scraper: ActressScraper) =>
  (request: ScrapeRequest): Promise<ScrapeResult> => {
    const scrapeOverviewAndProceedWithDetail = () => {
      if (!request.name) return Promise.reject();

      return scrapeOverview(scraper)(request.name).then(result => {
        if (result.alternatives?.length === 0) return Promise.reject();

        const singleAlternativeDetailUrl =
          result.alternatives.length === 1 && head(result.alternatives)?.detailUrl;

        if (!singleAlternativeDetailUrl) return result;
        return scrapeDetail(scraper)({ detailUrl: singleAlternativeDetailUrl });
      });
    };

    if (
      (request.name && scraper.detail.nameToUrl) ||
      (request.detailUrl && scraper.detail.detailUrlMatches(request.detailUrl))
    ) {
      return scrapeDetail(scraper)(request).then(result =>
        Object.values(result.actress ?? {}).filter(v => !!v).length > 0
          ? result
          : scrapeOverviewAndProceedWithDetail(),
      );
    }

    return scrapeOverviewAndProceedWithDetail();
  };

export const scrapeAllScrapers = (request: ScrapeRequest): Promise<ScrapeResult> =>
  Promise.any(
    [TrannyOneScraper, XcityScraper, FreeonesScraper].map(scraper =>
      scrape(scraper)(request).then(result => {
        if (!result.actress || !result.alternatives) {
          log.info(`[${scraper.name}]: Scraper returned nothing.`);
          return { actress: undefined, alternatives: [] };
        }

        log.info(
          `[${scraper.name}]: Scraper finished first with result: ${JSON.stringify(result)}`,
        );
        return result;
      }),
    ),
  );
