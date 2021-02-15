import { transformWebsite } from '../transformer/website';
import { Resolvers } from '../../../generated/resolver-types';
import { savePicture } from '../utils/savePicture';

export const createWebsiteResolvers: Resolvers = {
  Mutation: {
    createWebsite: async (_parent, { input }, { prisma }) => {
      const website = await prisma.website.create({
        data: {
          ...input,
          fetish: {
            connect: { id: input.fetish },
          },
        },
      });

      if (input.picture) {
        await savePicture(website.id, input.picture);
      }

      return transformWebsite(website);
    },
  },
};
