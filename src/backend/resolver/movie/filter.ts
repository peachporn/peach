import { Prisma } from '@prisma/client';

export const applyFilter = (
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
