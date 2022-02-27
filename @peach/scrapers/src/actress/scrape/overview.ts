import { html as cheerioHtml, load } from 'cheerio';
import { mergeDeepLeft } from 'ramda';
import { ActressScraper, ScrapeAlternative } from '../type';
import { html } from './fetch';
import { scrapeField } from './field';

export const scrapeOverview = (scraper: ActressScraper) => (name: string) =>
  html(scraper.overview.nameToUrl(name))
    .then($ => {
      const alternativeItems = $(scraper.overview.itemSelector);

      return alternativeItems.toArray().map(
        alternative$ =>
          Object.entries(scraper.overview.fields)
            .map(([field, fieldScraper]) =>
              scrapeField(load(cheerioHtml(alternative$)), field, fieldScraper),
            )
            .reduce(mergeDeepLeft) as ScrapeAlternative,
      );
    })
    .then(alternatives => ({ alternatives }));
