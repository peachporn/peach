import { UpdateSettingsInput } from '@peach/types';
import { fromEnvOptional } from '@peach/utils/src/env';
import { nonNullish } from '@peach/utils/src/list';
import { PrismaClient } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';

export const saveVolumes = async (
  volumes: UpdateSettingsInput['volumes'],
  prisma: PrismaClient,
) => {
  const existingVolumes = await prisma.volume.findMany();

  const volumesToUpdate = nonNullish(
    existingVolumes.map(e => {
      const updateVolume = volumes.find(v => v.name === e.name || v.path === e.path);
      if (!updateVolume) {
        return null;
      }

      return {
        id: e.id,
        ...updateVolume,
      };
    }),
  );

  const volumesToCreate = volumes.filter(v => !volumesToUpdate.map(w => w.name).includes(v.name));

  return Promise.all([
    ...volumesToCreate.map(v =>
      prisma.volume.create({
        data: v,
      }),
    ),
    ...volumesToUpdate.map(v =>
      prisma.volume.update({
        where: {
          id: v.id,
        },
        data: {
          name: v.name,
          path: v.path,
        },
      }),
    ),
  ]);
};

export const volumesResolvers: Resolvers = {
  Settings: {
    volumes: async (_parent, _args, { prisma }) =>
      prisma.volume.findMany().then(volumes => {
        const defaultVolumePath = fromEnvOptional('DEFAULT_VOLUME_PATH');
        if (!volumes.length && defaultVolumePath) {
          return prisma.volume
            .create({
              data: {
                name: 'My Porn Library',
                path: defaultVolumePath,
              },
            })
            .then(() => prisma.volume.findMany());
        }
        return volumes;
      }),
  },
};
