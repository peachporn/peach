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
          data,
        })
        .then(transformMovie),
    setMovieFetishes: async (_parent, { movieId, genreIds }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            fetishes: true,
          },
          data: {
            fetishes: {
              set: genreIds.map(id => ({ id })),
            },
          },
        })
        .then(transformMovie),
    addActressToMovie: async (_parent, { movieId, actressId }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            actresses: true,
          },
          data: {
            actresses: {
              connect: {
                id: actressId,
              },
            },
          },
        })
        .then(transformMovie),
    removeActressFromMovie: async (_parent, { movieId, actressId }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            actresses: true,
          },
          data: {
            actresses: {
              disconnect: {
                id: actressId,
              },
            },
          },
        })
        .then(transformMovie),
  },
};
