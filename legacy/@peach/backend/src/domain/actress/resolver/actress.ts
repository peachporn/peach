import { isInBusiness } from '@peach/domain';
import { diffYears } from '@peach/utils/src/date';
import { Resolvers } from '../../../generated/resolver-types';
import { transformActress } from '../transformer/actress';

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
  },
};
