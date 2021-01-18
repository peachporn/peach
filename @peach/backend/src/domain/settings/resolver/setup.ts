import { Resolvers } from '../../../generated/resolver-types';

export const setupResolvers: Resolvers = {
  Query: {
    setupStatus: async (_parent, _args, { prisma }) => {
      const volumes = await prisma.volume.findMany();
      const hasVolumes = volumes.length > 0;

      if (!hasVolumes) {
        return 'NoVolumes';
      }

      return 'Complete';
    },
  },
};
