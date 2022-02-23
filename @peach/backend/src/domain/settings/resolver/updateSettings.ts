import nodePath from 'path';
import { exists } from '@peach/utils/src/fs';
import mkdirp from 'mkdirp';
import { omit } from 'ramda';
import { Resolvers } from '../../../generated/resolver-types';
import { transformSettings } from '../transformer/settings';
import { saveVolumes } from './volumes';

const createLibraryStructure = (path: string) =>
  Promise.all(
    ['actresses', 'screencaps', 'genres', 'websites'].map(p => mkdirp(nodePath.join(path, p))),
  );

export const updateSettingsResolvers: Resolvers = {
  Query: {
    pathExists: (_parent, { path }, _context) => exists(path),
  },
  Mutation: {
    updateSettings: (_parent, { data }, { prisma }) =>
      Promise.all([
        data.libraryPath ? createLibraryStructure(data.libraryPath) : Promise.resolve([]),
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
      ]).then(([_, __, settings]) => transformSettings(settings)),
  },
};
