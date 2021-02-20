import { transformActress } from '../transformer/actress';
import { Resolvers } from '../../../generated/resolver-types';

/*
 */

export const updateActressResolvers: Resolvers = {
  Mutation: {
    updateActress: async (_parent, { actressId, data }, { prisma }) => {
      const {
        measurements,
        aliases,
        socialMediaLinks,
        dateOfBirth,
        dateOfCareerstart,
        dateOfRetirement,
        dateOfDeath,
        ...restData
      } = data;
      return prisma.actress
        .update({
          where: {
            id: actressId,
          },
          data: {
            ...restData,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            dateOfCareerstart: dateOfCareerstart ? new Date(dateOfCareerstart) : null,
            dateOfRetirement: dateOfRetirement ? new Date(dateOfRetirement) : null,
            dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
            aliases: JSON.stringify(aliases?.filter(Boolean).length ? aliases : []),
            socialMediaLinks: JSON.stringify(
              socialMediaLinks?.filter(Boolean).length ? socialMediaLinks : [],
            ),
            measurements: JSON.stringify(measurements || {}),
          },
        })
        .then(transformActress);
    },
  },
};
