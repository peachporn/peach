import { Resolvers } from '../../../generated/resolver-types';
import { applyGenreFilter } from './genres';

export const genreCountResolvers: Resolvers = {
  Query: {
    genreCount: async (_parent, { filter }, { prisma }) =>
      prisma.genre.count(applyGenreFilter(filter)),
  },
};
