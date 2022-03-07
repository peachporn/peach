import { scrapeAllScrapers, ScrapeRequest } from '@peach/scrapers';
import { Resolvers } from '../../../generated/resolver-types';
import { transformScrapedActress } from '../transformer/actressScrapeResult';

export const scrapeActressResolvers: Resolvers = {
  Query: {
    scrapeActress: async (_parent, { request }) => {
      if (!request.name && !request.detailUrl) return undefined;
      const scrapeResult = await scrapeAllScrapers(request as ScrapeRequest);

      return {
        __typename: 'ActressScrapeResult',
        alternatives: scrapeResult.alternatives,
        actress: !scrapeResult.actress ? undefined : transformScrapedActress(scrapeResult.actress),
      };
    },
  },
};
