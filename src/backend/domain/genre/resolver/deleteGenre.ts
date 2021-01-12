import { transformGenre } from '../transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';

export const deleteGenreResolvers: Resolvers = {
  Mutation: {
    deleteGenre: async (_parent, { genreId }, { prisma }) =>
      prisma.genre
        .delete({
          where: {
            id: genreId,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(transformGenre),
  },
};
