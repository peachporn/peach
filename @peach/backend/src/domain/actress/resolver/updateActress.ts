import { transformActress } from '../transformer/actress';
import { Resolvers } from '../../../generated/resolver-types';

/*
 */

export const updateActressResolvers: Resolvers = {
  Mutation: {
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
  },
};
