import { ActressFilterInput } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';

export const applyActressFilter = (
  filter: ActressFilterInput | undefined,
): Pick<Prisma.ActressFindManyArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.ids
            ? {}
            : {
                id: {
                  in: filter.ids,
                },
              }),
          ...(!filter.name
            ? {}
            : {
                OR: [
                  {
                    name: {
                      contains: filter.name,
                    },
                  },
                  {
                    aliases: {
                      contains: filter.name,
                    },
                  },
                ],
              }),
          ...(!filter.equipment
            ? {}
            : filter.equipment.type === 'Dick'
            ? {
                dick: true,
              }
            : filter.equipment.type === 'Pussy'
            ? {
                pussy: true,
              }
            : {}),
        },
      };
