import { toDBActress } from '@peach/domain/src/actress/conversions/createInputToDbActress';
import { Resolvers } from '../../../generated/resolver-types';
import { transformActress } from '../transformer/actress';

export const createActressResolvers: Resolvers = {
  Mutation: {
    createActress: async (_parent, { input }, { prisma }) =>
      prisma.actress
        .create({
          data: toDBActress(input),
        })
        .then(transformActress),
  },
};
