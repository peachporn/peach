import { Resolvers } from '../generated/resolver-types';

export const resolver: Resolvers = {
  Query: {
    settings: async (_parent, _args, { prisma }) =>
      prisma.settings.findMany().then(s =>
        s.length
          ? s[0]
          : prisma.settings.create({
              data: {
                language: 'EN',
              },
            }),
      ),
  },
};
