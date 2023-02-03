import { Resolvers } from '../../../generated/resolver-types';
import { touchedMovieFilter } from './movies';

export const movieCountResolvers: Resolvers = {
  Query: {
    movieCount: (_parent, _args, { prisma }) =>
      Promise.all([prisma.movie.count(), prisma.movie.count({ where: touchedMovieFilter })]).then(
        ([all, touched]) => ({
          __typename: 'MovieCountResponse',
          all,
          untouched: all - touched,
        }),
      ),
  },
};
