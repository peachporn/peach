import { MovieFilterInput } from '@peach/types';
import { nonNullish } from '@peach/utils/src/list';
import { Prisma } from '@peach/utils/src/prisma';

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
              : {}),
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
          ...(!filter.constellation
            ? {}
            : {
                actresses: {
                  some: Object.fromEntries(
                    nonNullish(
                      (filter.constellation?.[0].equipment ?? []).map(eq =>
                        eq.type === 'Dick'
                          ? ['dick', true]
                          : eq.type === 'Pussy'
                            ? ['pussy', true]
                            : undefined,
                      ),
                    ),
                  ),
                },
              }),
        },
      };
