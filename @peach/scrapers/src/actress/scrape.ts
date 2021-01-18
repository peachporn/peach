import { mergeDeepLeft } from 'ramda';
import { load } from 'cheerio';
import { ActressFieldScraper, ActressScraper, ExtractType, ScrapedActress } from './type';
import { html } from './fetch';

type CheerioRoot = ReturnType<typeof load>;
type Cheerio = ReturnType<CheerioRoot['root']>;
type Extractor = (element: Cheerio) => string | undefined;

const extractors = new Map<ExtractType, Extractor>();
extractors.set('text', e => e.text());
extractors.set('href', e => e.attr('href'));
extractors.set('src', e => e.attr('src'));

const scrapeField = (
  $: CheerioRoot,
  field: string,
  fieldScraper: ActressFieldScraper | undefined,
) => {
  if (!fieldScraper) {
    throw new Error(`Error reading field scraper definition for field ${field}`);
  }
  const { type, selector, transform } = fieldScraper;

  const extract = extractors.get(type);
  if (!extract) {
    throw new Error(`No extractor defined for type ${type}`);
  }

  const doTransform = transform || ((x: unknown) => x);
  const extracted = extract($(selector));

  return {
    [field]: extracted ? doTransform(extracted) : undefined,
  };
};

export const scrape = (scraper: ActressScraper) => (name: string) =>
  html(scraper.nameToUrl(name))
    .then($ =>
      Object.entries(scraper.fields).map(([field, fieldScraper]) =>
        scrapeField($, field, fieldScraper),
      ),
    )
    .then(scrapedFields => scrapedFields.reduce(mergeDeepLeft) as Partial<ScrapedActress>);
