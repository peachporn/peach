import { head, mergeDeepRight } from 'ramda';
import { FreeonesScraper } from '../sites/freeones';
import { TrannyOneScraper } from '../sites/trannyOne';
import { XcityScraper } from '../sites/xcity';
import { ActressScraper, ScrapeRequest, ScrapeResult } from '../type';
import { scrapeDetail } from './detail';
import { scrapeOverview } from './overview';

export const scrape =
  (scraper: ActressScraper) =>
  (request: ScrapeRequest): Promise<ScrapeResult> => {
    const scrapeOverviewAndProceedWithDetail = () => {
      if (!request.name) return Promise.resolve({ alternatives: [] });

      return scrapeOverview(scraper)(request.name).then(result => {
        const singleAlternativeDetailUrl =
          result.alternatives.length === 1 && head(result.alternatives)?.detailUrl;

        if (!singleAlternativeDetailUrl) return result;
        return scrapeDetail(scraper)({ detailUrl: singleAlternativeDetailUrl });
      });
    };

    if (scraper.detail.nameToUrl || request.detailUrl) {
      return scrapeDetail(scraper)(request).then(result =>
        Object.values(result.actress ?? {}).filter(v => !!v).length > 0
          ? result
          : scrapeOverviewAndProceedWithDetail(),
      );
    }

    return scrapeOverviewAndProceedWithDetail();
  };

export const scrapeAllScrapers = (request: ScrapeRequest): Promise<ScrapeResult> =>
  Promise.all(
    [TrannyOneScraper, XcityScraper, FreeonesScraper].map(scraper => scrape(scraper)(request)),
  ).then(results => results.reduce(mergeDeepRight));
