import { transformSettings } from '../transformer/settings';
import { Resolvers } from '../../../generated/resolver-types';
import { exists } from '../../../../utils/fs';

export const updateSettingsResolvers: Resolvers = {
  Query: {
    pathExists: (_parent, { path }, _context) => exists(path),
  },
  Mutation: {
    updateSettings: (_parent, { data }, { prisma }) =>
      prisma.settings
        .update({
          where: {
            id: 1,
          },
          data,
        })
        .then(transformSettings),
  },
};
