import { omit } from 'ramda';
import { Resolvers } from '../../../generated/resolver-types';
import { transformGenre } from '../transformer/genre';

export const updateGenreResolvers: Resolvers = {
  Mutation: {
    updateGenre: async (_parent, { genreId, data }, { prisma }) =>
      prisma.genre
        .update({
          where: {
            id: genreId,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
          data: {
            ...omit(['linkableChildren'], data),
            linkableChildren: {
              set: (data.linkableChildren || []).map(id => ({ id })),
            },
          },
        })
        .then(transformGenre),
  },
};
