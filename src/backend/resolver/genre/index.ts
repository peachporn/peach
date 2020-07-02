import { Resolvers } from '../../generated/resolver-types';
import { transformGenre } from '../../transformers/genre';
import { applyFilter } from './filter';

export const genreResolvers: Resolvers = {
  Query: {
    genres: async (_parent, { filter, skip, limit }, { prisma }) =>
      prisma.genre
        .findMany({
          skip,
          take: limit || 30,
          ...applyFilter(filter),
          include: {
            linkableParents: true,
          },
        })
        .then(genres => genres.map(transformGenre)),
  },
  Mutation: {
    removeLinkableParent: async (_parent, args, { prisma }) => {
      const child = await prisma.genre.findOne({ where: { id: args.child } });
      const parent = await prisma.genre.findOne({ where: { id: args.parent } });

      if (child === null || parent === null) {
        return undefined;
      }

      return prisma.genre
        .update({
          where: { id: args.child },
          data: {
            linkableParents: {
              disconnect: { id: parent.id },
            },
          },
          include: {
            linkableParents: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g)));
    },
    addLinkableParent: async (_parent, args, { prisma }) => {
      const child = await prisma.genre.findOne({ where: { id: args.child } });
      const parent = await prisma.genre.findOne({ where: { id: args.parent } });

      if (child === null || parent === null) {
        return undefined;
      }

      return prisma.genre
        .update({
          where: { id: args.child },
          data: {
            linkableParents: {
              connect: { id: parent.id },
            },
          },
          include: {
            linkableParents: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g)));
    },
    createGenre: async (_parent, { genreInput }, { prisma }) =>
      prisma.genre
        .create({
          data: {
            ...genreInput,
          },
          include: {
            linkableParents: true,
          },
        })
        .then(transformGenre),
  },
};
