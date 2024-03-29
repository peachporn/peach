import { mergeDeepLeft } from 'ramda';
import {
  ActressFieldScraper,
  ActressScraper,
  ScrapedActress,
  ScrapeRequest,
  ScrapeResult,
} from '../type';
import { html } from './fetch';
import { scrapeField } from './field';

export const scrapeDetail =
  (scraper: ActressScraper) =>
  ({ name, detailUrl }: ScrapeRequest): Promise<ScrapeResult> => {
    const url = detailUrl || scraper.detail.nameToUrl?.(name!);
    if (!url) {
      return Promise.reject(`[${scraper.name}]:  No URL to scrape found for input ${name}!`);
    }

    return html(url, scraper.detail.readySelector)
      .then($ =>
        Object.entries(scraper.detail.fields).map(
          ([field, fieldScraper]) =>
            $ && scrapeField($, field, fieldScraper as ActressFieldScraper<{}>),
        ),
      )
      .then(scrapedFields => scrapedFields.reduce(mergeDeepLeft) as ScrapedActress)
      .then(actress => {
        if (!actress) return Promise.reject();

        return {
          actress,
          alternatives: [],
        };
      });
  };
