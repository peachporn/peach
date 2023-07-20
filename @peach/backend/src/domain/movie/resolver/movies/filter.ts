import { MovieFilterInput } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';

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
