import { without } from 'ramda';
import { Prisma, Movie as DBMovie } from '@peach/utils';
import { MoviesFilter } from '@peach/types';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../transformer/movie';

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
    movies: (_parent, { limit, skip, filter, sort }, { prisma }) =>
      (sort === 'RANDOM'
        ? prisma.$queryRaw<DBMovie[]>(`SELECT * from movie ORDER BY RANDOM() LIMIT ${limit || 1};`)
        : prisma.movie.findMany({
            skip: skip || 0,
            take: limit || 30,
            orderBy: sort === 'CREATED_AT_DESC' ? { createdAt: 'desc' } : { id: 'asc' },
            ...applyMovieFilter(filter),
            include: {
              genres: true,
            },
          })
      ).then(movies => movies.map(transformMovie)),
  },
};
