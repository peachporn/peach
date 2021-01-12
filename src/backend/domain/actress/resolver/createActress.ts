import { transformActress } from '../transformer/actress';
import { scrapeActress } from '../../../../tasks/actress-data';
import { Resolvers } from '../../../generated/resolver-types';

export const createActressResolvers: Resolvers = {
  Mutation: {
    createActress: async (_parent, { actress: { name } }, { prisma }) => {
      const actress = await prisma.actress.create({
        data: {
          name,
        },
      });

      await scrapeActress({ name, id: actress.id });

      return transformActress(actress);
    },
    scrapeActress: async (_parent, { id }, { prisma }) => {
      const actress = await prisma.actress.findUnique({ where: { id } });

      if (!actress) {
        throw new Error(`No actress found with id ${id}`);
      }

      await scrapeActress({ name: actress.name, id: actress.id });
      return true;
    },
  },
};
