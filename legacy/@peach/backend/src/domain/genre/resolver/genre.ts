import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../../movie/transformer/movie';
import { transformGenre } from '../transformer/genre';

export const genreResolvers: Resolvers = {
  Genre: {
    picture: parent => `/assets/genre/${parent.id}.jpg`,
    fetishMovies: (parent, _args, { prisma }) =>
      prisma.movie
        .findMany({
          where: {
            fetishes: {
              some: {
                id: parent.id,
              },
            },
          },
        })
        .then(movies => movies.map(transformMovie)),
    movies: (parent, _args, { prisma }) =>
      prisma.movie
        .findMany({
          where: {
            genres: {
              some: {
                id: parent.id,
              },
            },
          },
        })
        .then(movies => movies.map(transformMovie)),
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
  },
};
