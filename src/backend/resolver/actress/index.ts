import { Resolvers } from '../../generated/resolver-types';
import { transformActress } from '../../transformers/actress';

export const actressResolvers: Resolvers = {
  Mutation: {
    createActress: async (_parent, { actress: { name } }, { prisma }) => {
      const actress = await prisma.actress.create({
        data: {
          name,
        },
      });

      return transformActress(actress);
    },
  },
};
