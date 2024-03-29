import { Resolvers } from '../../../generated/resolver-types';

import { applyActressFilter } from './actresses/filter';

export const actressCountResolvers: Resolvers = {
  Query: {
    actressCount: async (_parent, { filter }, { prisma }) =>
      prisma.actress.count(applyActressFilter(filter)),
  },
};
