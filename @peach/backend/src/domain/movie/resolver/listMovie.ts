import { Prisma, shuffle } from '@peach/utils';
import { MovieFilter } from '@peach/types';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../transformer/movie';

export const applyMovieFilter = (
  filter: MovieFilter | undefined,
): Pick<Prisma.MovieFindManyArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
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

export const listMovieResolvers: Resolvers = {
  Query: {
    movieCount: (_parent, _args, { prisma }) => prisma.movie.count(),
    movies: (_parent, { limit, skip, filter, sort }, { prisma }) =>
      (sort === 'RANDOM'
        ? prisma.movie.count().then(count => {
            const blockLimit = (limit || 30) * 5;
            const randomSkip = Math.floor(
              Math.random() * Math.max(0, Math.min(count, count - blockLimit || 0)),
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
            },
          })
      ).then(movies => movies.map(transformMovie)),
  },
};
