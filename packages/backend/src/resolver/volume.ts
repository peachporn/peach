import { Resolvers } from '../generated/resolver-types';

export const resolver: Resolvers = {
  Mutation: {
    createVolume: async (_parent, { input: { name, path } }, { prisma }) => {
      const volume = await prisma.volume.create({
        data: {
          name,
          path,
        },
      });

      return !!volume;
    },
  },
};
