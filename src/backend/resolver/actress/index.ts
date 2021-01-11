import { Resolvers } from '../../generated/resolver-types';
import { transformActress } from '../../transformers/actress';
import { scrapeActress } from '../../../tasks/actress-data';
import { isInBusiness } from '../../../domain/actress/date';
import { applyFilter } from './filter';

export const actressResolvers: Resolvers = {
  Actress: {
    inBusiness: parent => isInBusiness(parent),
    picture: parent => `/assets/actress/${parent.id}.jpg`,
  },
  Query: {
    actress: async (_parent, { id }, { prisma }) =>
      prisma.actress
        .findUnique({ where: { id }, include: { movies: true } })
        .then(actress => (actress ? transformActress(actress) : undefined)),

    actressesCount: async (_parent, { filter }, { prisma }) =>
      prisma.actress.count(applyFilter(filter)),

    actresses: async (_parent, { filter, skip, limit }, { prisma }) =>
      prisma.actress
        .findMany({
          skip,
          take: limit || 30,
          ...applyFilter(filter),
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
    updateActress: async (_parent, { actressId, data }, { prisma }) => {
      const { measurements, ...restData } = data;
      return prisma.actress
        .update({
          where: {
            id: actressId,
          },
          data: {
            ...restData,
            ...(!measurements
              ? {}
              : {
                  measurements: JSON.stringify(measurements),
                }),
          },
        })
        .then(transformActress);
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
