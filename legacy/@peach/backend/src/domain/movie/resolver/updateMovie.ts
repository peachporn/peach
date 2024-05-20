import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const updateMovieResolvers: Resolvers = {
  Mutation: {
    updateMovie: async (_parent, { movieId, data }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            fetishes: true,
          },
          data: {
            title: data.title,
            cover: data.cover,
            website: {
              ...(!data.website ? { disconnect: true } : {}),
              ...(data.website
                ? {
                    connect: { id: data.website },
                  }
                : {}),
            },
            actresses: {
              ...(data.actresses
                ? {
                    set: data.actresses.map(id => ({ id })),
                  }
                : {}),
            },
            fetishes: {
              set: [...(data.fetishes?.map(id => ({ id })) ?? [])],
            },
          },
        })
        .then(transformMovie),
  },
};
