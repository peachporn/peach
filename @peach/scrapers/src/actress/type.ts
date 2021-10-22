import { ScrapedActress as GQLScrapedActress } from '@peach/types';

export type ScrapeResult = {
  actress?: ScrapedActress;
  alternatives: ScrapeAlternative[];
};

export type ScrapeAlternative = {
  name: string;
  pictureUrl: string;
  aliases: string[];
};

export type ScrapedActress = Omit<Partial<GQLScrapedActress>, '__typename'>;

export type ExtractType = 'text' | 'href' | 'src' | 'html';

export type ActressFieldScraper<T, K extends keyof T = keyof T> = {
  selector: string;
  type: ExtractType;
  transform?: (value: string) => T[K] | undefined;
};

export type ActressScraper = {
  nameToUrl: (name: string) => string;
  fields: {
    [K in keyof ScrapedActress]?: ActressFieldScraper<ScrapedActress, K>;
  };
  nameToAlternativeSearchUrl: (name: string) => string;
  alternativeItemSelector: string;
  alternativeFields: {
    [K in keyof ScrapeAlternative]?: ActressFieldScraper<ScrapeAlternative, K>;
  };
};
