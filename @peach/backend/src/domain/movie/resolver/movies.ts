import { MovieFilterInput } from '@peach/types';
import { shuffle } from '@peach/utils/src/list';
import { Prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../transformer/movie';

export const touchedMovieFilter = {
  OR: [
    {
      website: {
        id: {
          gte: 0,
        },
      },
    },
    {
      actresses: {
        some: {},
      },
    },
    {
      fetishes: {
        some: {},
      },
    },
  ],
};

export const applyMovieFilter = (
  filter: MovieFilterInput | undefined,
): Pick<Prisma.MovieFindManyArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(filter.untouched === undefined
            ? {}
            : filter.untouched
            ? { NOT: [touchedMovieFilter] }
            : touchedMovieFilter),
          ...(!filter.actresses
            ? {}
            : {
                actresses: {
                  some: {
                    OR: filter.actresses.map(a => ({ id: a })),
                  },
                },
              }),
          ...(!filter.websites
            ? {}
            : {
                website: {
                  OR: filter.websites.map(f => ({ id: f })),
                },
              }),
          ...(!filter.title
            ? {}
            : {
                title: {
                  contains: filter.title,
                },
              }),
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

export const moviesResolvers: Resolvers = {
  Query: {
    movies: async (_parent, { limit, skip, filter, sort }, { prisma }) => {
      const filteredCount = await prisma.movie.count({
        ...applyMovieFilter(filter),
      });

      return (
        sort === 'RANDOM'
          ? prisma.movie.count().then(totalCount => {
              const blockLimit = (limit || 30) * 5;
              const randomSkip = Math.floor(
                Math.random() * Math.max(0, Math.min(totalCount, totalCount - blockLimit || 0)),
              );

              return prisma.movie
                .findMany({
                  skip: randomSkip,
                  take: blockLimit,
                  ...applyMovieFilter(filter),
                  include: {
                    genres: true,
                  },
                })
                .then(movies => shuffle(movies).slice(0, limit));
            })
          : prisma.movie.findMany({
              skip: skip || 0,
              take: limit || 30,
              orderBy: sort === 'CREATED_AT_DESC' ? { createdAt: 'desc' } : { id: 'asc' },
              ...applyMovieFilter(filter),
              include: {
                genres: true,
                actresses: true,
                fetishes: true,
                website: true,
              },
            })
      ).then(movies => ({
        total: filteredCount,
        movies: movies.map(transformMovie),
      }));
    },
  },
};