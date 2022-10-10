import { isInBusiness } from '@peach/domain';
import { ActressFilter } from '@peach/types';
import { diffYears } from '@peach/utils/src/date';
import { Prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { transformActress } from '../transformer/actress';

export const applyActressFilter = (
  filter: ActressFilter | undefined,
): Pick<Prisma.ActressFindManyArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.ids
            ? {}
            : {
                id: {
                  in: filter.ids,
                },
              }),
          ...(!filter.name
            ? {}
            : {
                OR: [
                  {
                    name: {
                      contains: filter.name,
                    },
                  },
                  {
                    aliases: {
                      contains: filter.name,
                    },
                  },
                ],
              }),
        },
      };

export const actressResolvers: Resolvers = {
  Actress: {
    picture: parent => `/assets/actress/${parent.id}.jpg`,
  },
  ActressDates: {
    inBusiness: parent => isInBusiness(parent),
    age: parent =>
      !parent.dateOfBirth ? undefined : diffYears(new Date(), new Date(parent.dateOfBirth)),
  },
  Query: {
    actress: async (_parent, { id }, { prisma }) =>
      prisma.actress
        .findUnique({ where: { id }, include: { movies: true } })
        .then(actress => (actress ? transformActress(actress) : undefined))
        .catch(e => {
          console.error(e);
          return undefined;
        }),

    actressesCount: async (_parent, { filter }, { prisma }) =>
      prisma.actress.count(applyActressFilter(filter)),

    actresses: async (_parent, { filter, skip, limit }, { prisma }) =>
      limit === 0
        ? []
        : prisma.actress
            .findMany({
              skip,
              take: limit || 30,
              ...applyActressFilter(filter),
            })
            .then(actresses => actresses.map(transformActress)),
  },
};
