import { FreeonesScraper, scrape } from '@peach/scrapers';
import { Resolvers } from '../../../generated/resolver-types';

export const scrapeActressResolvers: Resolvers = {
  Query: {
    scrapeActress: async (_parent, { name }) => {
      const scrapeResult = await scrape(FreeonesScraper)(name);

      return {
        __typename: 'ActressScrapeResult',
        ...scrapeResult,
        name,
      };
    },
  },
};
