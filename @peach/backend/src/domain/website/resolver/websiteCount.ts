import { Resolvers } from '../../../generated/resolver-types';
import { applyWebsiteFilter } from './websites';

export const websiteCountResolvers: Resolvers = {
  Query: {
    websiteCount: async (_parent, { filter }, { prisma }) =>
      prisma.website.count(applyWebsiteFilter(filter)),
  },
};
