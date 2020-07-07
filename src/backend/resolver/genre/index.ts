import { Resolvers } from '../../generated/resolver-types';
import { transformGenre } from '../../transformers/genre';
import { applyFilter } from './filter';

export const genreResolvers: Resolvers = {
  Genre: {
    linkableChildren: (parent, _args, { prisma }) =>
      prisma.genre
        .findMany({
          include: {
            linkableParents: true,
          },
        })
        .then(genres =>
          genres
            .filter(g => g.linkableParents.map(p => p.id).includes(parent.id))
            .map(transformGenre),
        ),
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
            linkableParents: true,
          },
        })
        .then(g => (!g ? undefined : transformGenre(g))),
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

    genresCount: async (_parent, { filter }, { prisma }) => prisma.genre.count(applyFilter(filter)),
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
    updateGenre: async (_parent, { genreId, data }, { prisma }) =>
      prisma.genre
        .update({
          where: {
            id: genreId,
          },
          include: {
            linkableParents: true,
          },
          data,
        })
        .then(transformGenre),
  },
};
