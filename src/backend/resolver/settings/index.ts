import { PrismaClient } from '@prisma/client';
import { scanLibrary } from '../../../tasks';
import { defaultSettings } from '../../../domain/settings';
import { transformSettings } from '../../transformers/settings';
import { Resolvers } from '../../generated/resolver-types';
import { exists } from '../../../utils/fs';
import { takeScreencapsForAllMovies } from '../../../tasks/screencaps';

const updateSettings = (prisma: PrismaClient, key: string, value: unknown) =>
  prisma.settings
    .update({
      where: {
        id: 1,
      },
      data: {
        [key]: value,
      },
    })
    .then(transformSettings);

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
    updateScreencapPath: (_parent, { screencapPath }, { prisma }) =>
      updateSettings(prisma, 'screencapPath', screencapPath),
    updateLanguage: (_parent, { language }, { prisma }) =>
      updateSettings(prisma, 'language', language),
    updateInferMovieTitle: (_parent, { inferMovieTitle }, { prisma }) =>
      updateSettings(prisma, 'inferMovieTitle', inferMovieTitle),
  },
};
