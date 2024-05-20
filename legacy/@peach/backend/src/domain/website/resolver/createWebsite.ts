import { transformWebsite } from '../transformer/website';
import { Resolvers } from '../../../generated/resolver-types';

export const createWebsiteResolvers: Resolvers = {
  Mutation: {
    createWebsite: async (_parent, { input }, { prisma }) => {
      const website = await prisma.website.create({
        data: {
          ...input,
          fetish: input.fetish
            ? {
                connect: { id: input.fetish },
              }
            : undefined,
        },
      });

      return transformWebsite(website);
    },
  },
};
