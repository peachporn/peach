import { mergeDeepLeft } from 'ramda';
import { load, html as cheerioHtml } from 'cheerio';
import {
  ActressFieldScraper,
  ActressScraper,
  ExtractType,
  ScrapeAlternative,
  ScrapedActress,
  ScrapeResult,
} from './type';
import { html } from './fetch';

type CheerioRoot = ReturnType<typeof load>;
type Cheerio = ReturnType<CheerioRoot['root']>;
type Extractor = (element: Cheerio) => string | undefined;

const extractors = new Map<ExtractType, Extractor>();
extractors.set('text', e => e.text());
extractors.set('html', e => e.html() || undefined);
extractors.set('href', e => e.attr('href'));
extractors.set('src', e => e.attr('src'));

const scrapeField = <T extends ScrapedActress | ScrapeAlternative>(
  $: CheerioRoot,
  field: string,
  fieldScraper: ActressFieldScraper<T> | undefined,
) => {
  if (!fieldScraper) {
    throw new Error(`Error reading field scraper definition for field ${field}`);
  }
  const { type } = fieldScraper;

  if (type === 'constant') {
    return fieldScraper.value;
  }

  const { transform, selector } = fieldScraper;

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

export const scrapeActress =
  (scraper: ActressScraper) =>
  (name: string): Promise<ScrapedActress> =>
    html(scraper.nameToUrl(name))
      .then($ =>
        Object.entries(scraper.fields).map(([field, fieldScraper]) =>
          // @ts-ignore
          scrapeField($, field, fieldScraper),
        ),
      )
      .then(scrapedFields => scrapedFields.reduce(mergeDeepLeft) as ScrapedActress);

export const scrapeAlternatives =
  (scraper: ActressScraper) =>
  (name: string): Promise<ScrapeAlternative[]> =>
    html(scraper.nameToAlternativeSearchUrl(name)).then($ => {
      const alternativeItems = $(scraper.alternativeItemSelector);

      return alternativeItems.toArray().map(
        alternative$ =>
          Object.entries(scraper.alternativeFields)
            .map(([field, fieldScraper]) =>
              scrapeField(load(cheerioHtml(alternative$)), field, fieldScraper),
            )
            .reduce(mergeDeepLeft) as ScrapeAlternative,
      );
    });

export const scrape =
  (scraper: ActressScraper) =>
  (name: string): Promise<ScrapeResult> =>
    scrapeActress(scraper)(name).then(actress =>
      Object.values(actress).filter(v => !!v).length > 0
        ? {
            actress,
            alternatives: [],
          }
        : scrapeAlternatives(scraper)(name).then(alternatives => ({
            alternatives,
          })),
    );
