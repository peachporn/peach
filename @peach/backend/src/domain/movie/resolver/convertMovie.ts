import { convertMovie } from '@peach/tasks/src/convertMovie';
import { Resolvers } from '../../../generated/resolver-types';

export const convertMovieResolvers: Resolvers = {
  Mutation: {
    convertMovie: async (_parent, { movieId }, { prisma }) =>
      prisma.movie
        .findUnique({
          where: {
            id: movieId,
          },
          include: {
            metadata: true,
            volume: true,
          },
        })
        .then(movie => movie && convertMovie({ movie }))
        .then(() => true),
  },
};
