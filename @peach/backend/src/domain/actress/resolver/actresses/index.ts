import { Resolvers } from '../../../../generated/resolver-types';
import { transformActress } from '../../transformer/actress';
import { applyActressFilter } from './filter';

export const actressesResolvers: Resolvers = {
  Query: {
    actresses: async (_parent, { filter, skip, limit }, { prisma }) => {
      if (limit === 0) return { total: 0, actresses: [] };

      const filteredCount = await prisma.actress.count({
        ...applyActressFilter(filter),
      });

      return prisma.actress
        .findMany({
          skip,
          take: limit || 30,
          ...applyActressFilter(filter),
        })
        .then(actresses => ({
          total: filteredCount,
          actresses: actresses.map(transformActress),
        }));
    },
  },
};
