import { Prisma } from '@prisma/client';
import { transformGenre } from '../transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';

export const applyGenreFilter = (
  filter: GenreFilter | undefined,
): Pick<Prisma.FindManyGenreArgs, 'where'> =>
  !filter
    ? {}
    : {
        where: {
          ...(!filter.name
            ? {}
            : {
                name: {
                  contains: filter.name,
                },
              }),
          ...(!filter.fetish
            ? {}
            : {
                validAsFetish: filter.fetish,
              }),
          ...(!filter.category
            ? {}
            : {
                category: filter.category,
              }),
        },
      };

export const genreResolvers: Resolvers = {
  Genre: {
    picture: parent => `/assets/genre/${parent.id}.jpg`,
  },
  Query: {
    genre: async (_parent, { id }, { prisma }) =>
      prisma.genre
        .findUnique({
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
          ...applyGenreFilter(filter),
          include: {
            linkableChildren: true,
            linkableParents: true,
          },
        })
        .then(genres => genres.map(transformGenre)),

    genresCount: async (_parent, { filter }, { prisma }) =>
      prisma.genre.count(applyGenreFilter(filter)),
  },
};
