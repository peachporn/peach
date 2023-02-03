import { Resolvers } from '../../../generated/resolver-types';
import { transformWebsite } from '../transformer/website';

export const websiteResolvers: Resolvers = {
  Website: {
    picture: parent => `/assets/website/${parent.id}.png`,
  },
  Query: {
    website: async (_parent, { id }, { prisma }) =>
      prisma.website
        .findUnique({ where: { id }, include: { fetish: true, movies: true } })
        .then(website => (website ? transformWebsite(website) : undefined)),
  },
};
