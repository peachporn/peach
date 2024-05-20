import { defaultSettings } from '@peach/domain';
import { Resolvers } from '../../../generated/resolver-types';
import { transformSettings } from '../transformer/settings';

export const settingsResolvers: Resolvers = {
  Query: {
    settings: async (_parent, _args, { prisma }) =>
      prisma.settings
        .findMany()
        .then(s =>
          s.length
            ? s[0]
            : prisma.settings.create({
                data: defaultSettings,
              }),
        )
        .then(transformSettings),
  },
};
