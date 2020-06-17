import { Resolvers } from '../../generated/resolver-types';
import { transformActress } from '../../transformers/actress';

export const actressResolvers: Resolvers = {
  Query: {
    actresses: async (_parent, { name }, { prisma }) =>
      prisma.actress
        .findMany({
          where: {
            name: {
              contains: name,
            },
          },
        })
        .then(actresses => actresses.map(transformActress)),
  },
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
