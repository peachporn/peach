import { FindManyActressArgs } from '@prisma/client';

export const applyFilter = (
  filter: ActressFilter | undefined,
): Pick<FindManyActressArgs, 'where'> =>
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
        },
      };
