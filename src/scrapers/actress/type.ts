export type ScrapedActress = Partial<Actress>;

export type ExtractType = 'text' | 'href' | 'src';

export type ActressFieldScraper<K extends keyof ScrapedActress = keyof ScrapedActress> = {
  selector: string;
  type: ExtractType;
  transform?: (value: string) => ScrapedActress[K] | undefined;
};

export type ActressScraper = {
  nameToUrl: (name: string) => string;
  fields: {
    [K in keyof ScrapedActress]?: ActressFieldScraper<K>;
  };
};
