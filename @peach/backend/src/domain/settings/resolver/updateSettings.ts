import { omit } from 'ramda';
import { exists } from '@peach/utils';
import { transformSettings } from '../transformer/settings';
import { Resolvers } from '../../../generated/resolver-types';
import { saveVolumes } from './volumes';

export const updateSettingsResolvers: Resolvers = {
  Query: {
    pathExists: (_parent, { path }, _context) => exists(path),
  },
  Mutation: {
    updateSettings: (_parent, { data }, { prisma }) =>
      Promise.all([
        data.volumes ? saveVolumes(data.volumes, prisma) : Promise.resolve([]),
        prisma.settings.update({
          where: {
            id: 1,
          },
          include: {
            pinnedFetishes: true,
          },
          data: {
            ...omit(['volumes'], data),
            pinnedFetishes: data.pinnedFetishes
              ? {
                  set: data.pinnedFetishes.map(f => ({
                    id: f,
                  })),
                }
              : undefined,
          },
        }),
      ]).then(([_, settings]) => transformSettings(settings)),
  },
};
