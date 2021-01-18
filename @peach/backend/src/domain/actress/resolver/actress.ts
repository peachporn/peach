import { Prisma } from '@prisma/client';
import { ActressFilter } from '@peach/types';
import { isInBusiness } from '@peach/domain';
import { transformActress } from '../transformer/actress';
import { Resolvers } from '../../../generated/resolver-types';

const applyActressFilter = (
  filter: ActressFilter | undefined,
): Pick<Prisma.FindManyActressArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.name
            ? {}
            : {
                name: {
                  contains: filter.name,
                },
              }),
        },
      };

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
      prisma.actress.count(applyActressFilter(filter)),

    actresses: async (_parent, { filter, skip, limit }, { prisma }) =>
      prisma.actress
        .findMany({
          skip,
          take: limit || 30,
          ...applyActressFilter(filter),
        })
        .then(actresses => actresses.map(transformActress)),
  },
};
