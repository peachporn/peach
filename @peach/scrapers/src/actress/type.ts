import {
  Cupsize,
  Eyecolor,
  GenderExpression,
  GeoLocation,
  Haircolor,
  Maybe,
  Measurements,
} from '@peach/types';
import { load } from 'cheerio';
import { RequireExactlyOne } from 'type-fest';

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
  detailUrl: string;
  pictureUrl: string;
  aliases: string[];
};

export type ScrapeResult = {
  actress?: ScrapedActress;
  alternatives: ScrapeAlternative[];
};

export type ScrapeRequest = RequireExactlyOne<
  {
    name: string;
    detailUrl: string;
  },
  'name' | 'detailUrl'
>;

export type CheerioRoot = ReturnType<typeof load>;
export type Cheerio = ReturnType<CheerioRoot['root']>;

export type ActressFieldScraper<T extends object, K extends keyof T = keyof T> =
  | {
      type: 'element';
      selector: string;
      transform?: (value: Cheerio) => T[K] | undefined;
    }
  | {
      type: 'constant';
      value: T[K];
    };

export type ActressScraper = {
  detail: {
    nameToUrl?: (name: string) => string;
    detailUrlMatches: (url: string) => boolean;
    readySelector?: string;
    fields: {
      [K in keyof ScrapedActress]?: ActressFieldScraper<ScrapedActress, K>;
    };
  };
  overview: {
    nameToUrl: (name: string) => string;
    readySelector?: string;
    itemSelector: string;
    fields: {
      [K in keyof ScrapeAlternative]?: ActressFieldScraper<ScrapeAlternative, K>;
    };
  };
};
