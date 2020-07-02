import { FindManyGenreArgs } from '@prisma/client';

export const applyFilter = (filter: GenreFilter | undefined): Pick<FindManyGenreArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.name
            ? {}
            : {
                name: {
                  contains: filter.name,
                },
              }),
          ...(!filter.category
            ? {}
            : {
                category: filter.category,
              }),
        },
      };
