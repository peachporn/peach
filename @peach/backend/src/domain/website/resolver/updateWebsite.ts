import { omit } from 'ramda';
import { Resolvers } from '../../../generated/resolver-types';
import { transformWebsite } from '../transformer/website';

export const updateWebsiteResolvers: Resolvers = {
  Mutation: {
    updateWebsite: async (_parent, { websiteId, data }, { prisma }) =>
      prisma.website
        .update({
          where: {
            id: websiteId,
          },
          data: {
            ...omit(['fetish'], data),
            ...(!data.fetish
              ? undefined
              : {
                  fetish: {
                    connect: {
                      id: data.fetish,
                    },
                  },
                }),
          },
        })
        .then(transformWebsite),
  },
};
