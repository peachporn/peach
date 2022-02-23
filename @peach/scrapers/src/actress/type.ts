import {
  Cupsize,
  Eyecolor,
  GenderExpression,
  GeoLocation,
  Haircolor,
  Maybe,
  Measurements,
} from '@peach/types';

export type ScrapedActress = {
  name?: string;
  aliases?: string[];
  picture?: string;

  // Appearance
  haircolor?: Haircolor;
  eyecolor?: Eyecolor;
  cupsize?: Cupsize;
  hasImplants?: boolean;
  hasDick?: boolean;
  hasPussy?: boolean;
  genderExpression?: GenderExpression;
  height?: number;
  weight?: number;
  measurements?: Maybe<Measurements>;
  piercings?: string;
  tattoos?: string;

  // Dates
  dateOfBirth?: string;
  dateOfCareerstart?: string;
  dateOfDeath?: string;
  dateOfRetirement?: string;

  // Location
  city?: string;
  country?: string;
  location?: GeoLocation;
  province?: string;

  // Contact
  officialWebsite?: string;
  socialMediaLinks?: string[];
};

export type ScrapeAlternative = {
  name: string;
  pictureUrl: string;
  aliases: string[];
};

export type ScrapeResult = {
  actress?: ScrapedActress;
  alternatives: ScrapeAlternative[];
};

export type ExtractType = 'text' | 'href' | 'src' | 'html';

export type ActressFieldScraper<T extends object, K extends keyof T = keyof T> =
  | {
      selector: string;
      type: ExtractType;
      transform?: (value: string) => T[K] | undefined;
    }
  | {
      type: 'constant';
      value: T[K];
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
