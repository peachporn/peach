import { scanLibrary } from '../../../tasks';
import { defaultSettings } from '../../../domain/settings';
import { transformSettings } from '../../transformers/settings';
import { Resolvers } from '../../generated/resolver-types';
import { exists } from '../../../utils/fs';
import { takeScreencapsForAllMovies } from '../../../tasks/screencaps';

export const settingsResolvers: Resolvers = {
  Query: {
    settings: async (_parent, _args, { prisma }) => {
      const settings = await prisma.settings
        .findMany()
        .then(s =>
          s.length
            ? s[0]
            : prisma.settings.create({
                data: defaultSettings,
              }),
        )
        .then(transformSettings);

      const volumes = await prisma.volume.findMany();

      return {
        ...settings,
        volumes,
      };
    },
    pathExists: (_parent, { path }, _context) => exists(path),
  },
  Mutation: {
    takeAllScreencaps: () => takeScreencapsForAllMovies().then(() => true),
    scanLibrary: () => scanLibrary({}).then(() => true),
    updateSettings: (_parent, { data }, { prisma }) =>
      prisma.settings
        .update({
          where: {
            id: 1,
          },
          data,
        })
        .then(transformSettings),
  },
};
