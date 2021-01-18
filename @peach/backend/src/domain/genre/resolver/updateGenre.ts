import { Resolvers } from '../../../generated/resolver-types';
import { transformGenre } from '../transformer/genre';

export const updateGenreResolvers: Resolvers = {
  Mutation: {
    updateGenre: async (_parent, { genreId, data }, { prisma }) =>
      prisma.genre
        .update({
          where: {
            id: genreId,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
          data,
        })
        .then(transformGenre),
    removeSubgenre: async (_parent, args, { prisma }) => {
      const child = await prisma.genre.findUnique({ where: { id: args.child } });
      const parent = await prisma.genre.findUnique({ where: { id: args.parent } });

      if (child === null || parent === null) {
        return undefined;
      }

      return prisma.genre
        .update({
          where: { id: args.parent },
          data: {
            linkableParents: {
              disconnect: { id: child.id },
            },
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g)));
    },
    addSubgenre: async (_parent, args, { prisma }) => {
      const child = await prisma.genre.findUnique({ where: { id: args.child } });
      const parent = await prisma.genre.findUnique({ where: { id: args.parent } });

      if (child === null || parent === null) {
        return undefined;
      }

      return prisma.genre
        .update({
          where: { id: args.parent },
          data: {
            linkableChildren: {
              connect: [{ id: child.id }],
            },
          },
          include: {
            linkableParents: true,
            linkableChildren: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g)));
    },
  },
};
