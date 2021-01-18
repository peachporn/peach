import { transformGenre } from '../transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';

export const createGenreResolvers: Resolvers = {
  Mutation: {
    createGenre: async (_parent, { genreInput }, { prisma }) =>
      prisma.genre
        .create({
          data: {
            ...genreInput,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(transformGenre),
  },
};
