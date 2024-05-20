import { omit } from 'ramda';
import { transformGenre } from '../transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';

export const createGenreResolvers: Resolvers = {
  Mutation: {
    createGenre: async (_parent, { genreInput }, { prisma }) =>
      prisma.genre
        .create({
          data: {
            ...omit(['linkableChildren'], genreInput),
            linkableChildren: {
              connect: (genreInput.linkableChildren || []).map(id => ({ id })),
            },
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(transformGenre),
  },
};
