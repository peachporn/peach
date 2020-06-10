import { Resolvers } from '../../generated/resolver-types';

export const volumeResolvers: Resolvers = {
  Mutation: {
    saveVolumes: async (_parent, { input: { volumes } }, { prisma }) => {
      const existingVolumes = await prisma.volume.findMany();

      // TODO: Check if paths exist

      const volumesToUpdateNull = existingVolumes.map(e => {
        const updateVolume = volumes.find(v => v.name === e.name || v.path === e.path);
        if (!updateVolume) {
          return null;
        }

        return {
          id: e.id,
          ...updateVolume,
        };
      });

      const volumesToUpdate = volumesToUpdateNull.filter(Boolean) as NonNullable<
        typeof volumesToUpdateNull[number]
      >[];

      const volumesToCreate = volumes.filter(
        v => !volumesToUpdate.map(w => w.name).includes(v.name),
      );

      const createdVolumes = await volumesToCreate.map(v =>
        prisma.volume.create({
          data: v,
        }),
      );

      const updatedVolumes = await volumesToUpdate.map(v =>
        prisma.volume.update({
          where: {
            id: v.id,
          },
          data: v,
        }),
      );

      return [...createdVolumes, ...updatedVolumes];
    },
  },
};
