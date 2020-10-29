import { Resolvers } from '../../generated/resolver-types';
import { transformGenre } from '../../transformers/genre';
import { applyFilter } from './filter';

export const genreResolvers: Resolvers = {
  Genre: {
    picture: parent => `/assets/genre/${parent.id}.jpg`,
  },
  Query: {
    genre: async (_parent, { id }, { prisma }) =>
      prisma.genre
        .findOne({
          where: {
            id,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g))),
    genres: async (_parent, { filter, skip, limit }, { prisma }) =>
      prisma.genre
        .findMany({
          skip,
          orderBy: {
            name: 'asc',
          },
          take: limit || 30,
          ...applyFilter(filter),
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(genres => genres.map(transformGenre)),

    genresCount: async (_parent, { filter }, { prisma }) => prisma.genre.count(applyFilter(filter)),
  },
  Mutation: {
    removeSubgenre: async (_parent, args, { prisma }) => {
      const child = await prisma.genre.findOne({ where: { id: args.child } });
      const parent = await prisma.genre.findOne({ where: { id: args.parent } });

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
      const child = await prisma.genre.findOne({ where: { id: args.child } });
      const parent = await prisma.genre.findOne({ where: { id: args.parent } });

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
    createGenre: async (_parent, { genreInput }, { prisma }) =>
      prisma.genre
        .create({
          data: {
            ...genreInput,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(transformGenre),
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
    deleteGenre: async (_parent, { genreId }, { prisma }) =>
      prisma.genre
        .delete({
          where: {
            id: genreId,
          },
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(transformGenre),
  },
};
