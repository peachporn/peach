import { mergeDeepLeft } from 'ramda';
import { ActressScraper, ScrapedActress, ScrapeRequest, ScrapeResult } from '../type';
import { html } from './fetch';
import { scrapeField } from './field';

export const scrapeDetail =
  (scraper: ActressScraper) =>
  ({ name, detailUrl }: ScrapeRequest): Promise<ScrapeResult> => {
    const url = detailUrl ?? scraper.detail.nameToUrl?.(name!);
    if (!url) return Promise.resolve({ actress: undefined, alternatives: [] });

    return html(url, scraper.detail.readySelector)
      .then($ =>
        Object.entries(scraper.detail.fields).map(([field, fieldScraper]) =>
          // @ts-ignore
          scrapeField($, field, fieldScraper),
        ),
      )
      .then(scrapedFields => scrapedFields.reduce(mergeDeepLeft) as ScrapedActress)
      .then(actress => ({
        actress,
        alternatives: [],
      }));
  };
