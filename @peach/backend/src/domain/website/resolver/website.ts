import { Prisma } from '@peach/utils';
import { WebsiteFilter } from '@peach/types';
import { transformWebsite } from '../transformer/website';
import { Resolvers } from '../../../generated/resolver-types';

const applyWebsiteFilter = (
  filter: WebsiteFilter | undefined,
): Pick<Prisma.FindManyWebsiteArgs, 'where'> =>
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

export const websiteResolvers: Resolvers = {
  Website: {
    picture: parent => `/assets/website/${parent.id}.png`,
  },
  Query: {
    website: async (_parent, { id }, { prisma }) =>
      prisma.website
        .findUnique({ where: { id }, include: { fetish: true, movies: true } })
        .then(website => (website ? transformWebsite(website) : undefined)),

    websitesCount: async (_parent, { filter }, { prisma }) =>
      prisma.website.count(applyWebsiteFilter(filter)),

    websites: async (_parent, { filter, skip, limit }, { prisma }) =>
      limit === 0
        ? []
        : prisma.website
            .findMany({
              skip,
              include: {
                fetish: true,
              },
              take: limit || 30,
              ...applyWebsiteFilter(filter),
            })
            .then(websites => websites.map(transformWebsite)),
  },
};
