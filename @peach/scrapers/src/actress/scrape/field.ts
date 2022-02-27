import { ActressFieldScraper, CheerioRoot, ScrapeAlternative, ScrapedActress } from '../type';

export const scrapeField = <T extends ScrapedActress | ScrapeAlternative>(
  $: CheerioRoot,
  field: string,
  fieldScraper: ActressFieldScraper<T> | undefined,
) => {
  if (!fieldScraper) {
    throw new Error(`Error reading field scraper definition for field ${field}`);
  }
  const { type } = fieldScraper;

  if (type === 'constant') {
    return { [field]: fieldScraper.value };
  }

  const { transform, selector } = fieldScraper;
  const element = $(selector);

  return {
    [field]: element ? (transform ?? (x => x))(element) : undefined,
  };
};
