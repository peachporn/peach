import { WebsiteFilterInput } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { transformWebsite } from '../transformer/website';

export const applyWebsiteFilter = (
  filter: WebsiteFilterInput | undefined,
): Pick<Prisma.WebsiteFindManyArgs, 'where'> =>
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
                name: {
                  contains: filter.name,
                },
              }),
        },
      };

export const websitesResolvers: Resolvers = {
  Query: {
    websites: async (_parent, { filter, skip, limit }, { prisma }) => {
      if (limit === 0) return { total: 0, websites: [] };

      const filteredCount = await prisma.website.count({
        ...applyWebsiteFilter(filter),
      });

      return prisma.website
        .findMany({
          skip,
          include: {
            fetish: true,
          },
          take: limit || 30,
          ...applyWebsiteFilter(filter),
        })
        .then(websites => ({
          total: filteredCount,
          websites: websites.map(transformWebsite),
        }));
    },
  },
};
