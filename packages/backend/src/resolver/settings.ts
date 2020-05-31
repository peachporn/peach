import { Resolvers } from '../generated/resolver-types';
import { SetupStatus } from '../generated/types';

export const resolver: Resolvers = {
  Query: {
    setupStatus: async (_parent, _args, { prisma }) => {
      const volumes = await prisma.volume.findMany();
      const hasVolumes = volumes.length > 0;

      if (!hasVolumes) {
        return SetupStatus.NoVolumes;
      }

      return SetupStatus.Complete;
    },
  },
};
