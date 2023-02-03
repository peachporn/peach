import { ActressFilterInput } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { transformActress } from '../transformer/actress';

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
        },
      };

export const actressesResolvers: Resolvers = {
  Query: {
    actresses: async (_parent, { filter, skip, limit }, { prisma }) => {
      if (limit === 0) return { total: 0, actresses: [] };

      const filteredCount = await prisma.actress.count({
        ...applyActressFilter(filter),
      });

      return prisma.actress
        .findMany({
          skip,
          take: limit || 30,
          ...applyActressFilter(filter),
        })
        .then(actresses => ({
          total: filteredCount,
          actresses: actresses.map(transformActress),
        }));
    },
  },
};
