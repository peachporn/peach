import { scanLibrary } from '@peach/tasks';
import { defaultSettings } from '@peach/domain';
import { Resolvers } from '../generated/resolver-types';
import { transformSettings } from '../transformer/settings';
import { PrismaClient } from '../../../database/generated';

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

export const resolver: Resolvers = {
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
  },
  Mutation: {
    scanLibrary: () => scanLibrary().then(() => true),
    updateLanguage: (_parent, { language }, { prisma }) =>
      updateSettings(prisma, 'language', language),
    updateInferMovieTitle: (_parent, { inferMovieTitle }, { prisma }) =>
      updateSettings(prisma, 'inferMovieTitle', inferMovieTitle),
  },
};
