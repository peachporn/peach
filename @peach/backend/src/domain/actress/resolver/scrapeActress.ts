import { FreeonesScraper, scrape } from '@peach/scrapers';
import { Resolvers } from '../../../generated/resolver-types';
import { transformScrapedActress } from '../transformer/actressScrapeResult';

export const scrapeActressResolvers: Resolvers = {
  Query: {
    scrapeActress: async (_parent, { name }) => {
      const scrapeResult = await scrape(FreeonesScraper)(name);

      return {
        __typename: 'ActressScrapeResult',
        alternatives: scrapeResult.alternatives,
        actress: !scrapeResult.actress ? undefined : transformScrapedActress(scrapeResult.actress),
      };
    },
  },
};
