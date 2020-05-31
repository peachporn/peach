import { Resolvers } from '../generated/resolver-types';
import { transformSettings } from '../transformer/settings';

export const resolver: Resolvers = {
  Query: {
    settings: async (_parent, _args, { prisma }) => {
      const settings = await prisma.settings
        .findMany()
        .then(s =>
          s.length
            ? s[0]
            : prisma.settings.create({
                data: {
                  language: 'EN',
                },
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
};
