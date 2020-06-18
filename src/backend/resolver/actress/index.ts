import { Resolvers } from '../../generated/resolver-types';
import { transformActress } from '../../transformers/actress';
import { scrapeActress } from '../../../tasks/actress-data';
import { isInBusiness } from '../../../domain/actress/date';

export const actressResolvers: Resolvers = {
  Actress: {
    inBusiness: parent => isInBusiness(parent),
  },
  Query: {
    actresses: async (_parent, { name }, { prisma }) =>
      !name
        ? []
        : prisma.actress
            .findMany({
              take: 30,
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

      await scrapeActress({ name, id: actress.id });

      return transformActress(actress);
    },
    scrapeActress: async (_parent, { id }, { prisma }) => {
      const actress = await prisma.actress.findOne({ where: { id } });

      if (!actress) {
        throw new Error(`No actress found with id ${id}`);
      }

      await scrapeActress({ name: actress.name, id: actress.id });
      return true;
    },
  },
};
