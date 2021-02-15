import { defaultSettings } from '@peach/domain';
import { Resolvers } from '../../../generated/resolver-types';

export const setupResolvers: Resolvers = {
  Query: {
    setupStatus: async (_parent, _args, { prisma }) => {
      const settings = await prisma.settings
        .findMany({
          include: {
            pinnedFetishes: true,
          },
        })
        .then(s =>
          s.length
            ? s[0]
            : prisma.settings.create({
                data: defaultSettings,
              }),
        );

      if (!settings.libraryPath) return 'NoLibraryPath';

      const volumes = await prisma.volume.findMany();
      const hasVolumes = volumes.length > 0;

      if (!hasVolumes) return 'NoVolumes';

      return 'Complete';
    },
  },
};
