import { without } from 'ramda';
import { Prisma } from '@prisma/client';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovieListMovie } from '../transformer/movieListMovie';

export const applyMovieFilter = (
  filter: MoviesFilter | undefined,
): Pick<Prisma.FindManyMovieArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.fetishes
            ? {}
            : {
                fetishes: {
                  some: {
                    OR: filter.fetishes.map(f => ({ id: f })),
                  },
                },
              }),
        },
      };

export const listMovieResolvers: Resolvers = {
  Query: {
    movieCount: (_parent, _args, { prisma }) => prisma.movie.count(),
    movies: (_parent, { limit, skip, filter }, { prisma }) =>
      prisma.movie
        .findMany({
          skip: skip || 0,
          take: limit || 30,
          ...applyMovieFilter(filter),
          include: {
            genres: true,
          },
        })
        .then(movies => movies.map(transformMovieListMovie)),
  },
};
