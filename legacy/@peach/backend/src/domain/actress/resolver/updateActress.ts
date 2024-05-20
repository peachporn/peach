import { toDBActress } from '@peach/domain/src/actress/conversions/updateInputToDbActress';
import { Resolvers } from '../../../generated/resolver-types';
import { transformActress } from '../transformer/actress';

export const updateActressResolvers: Resolvers = {
  Mutation: {
    updateActress: async (_parent, { actressId, data }, { prisma }) =>
      prisma.actress
        .update({
          where: {
            id: actressId,
          },
          data: toDBActress(data),
        })
        .then(actress => transformActress(actress)),
  },
};
