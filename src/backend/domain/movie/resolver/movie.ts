import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const movieResolvers: Resolvers = {
  Movie: {
    url: parent => `/assets/movie/${parent.id}`,
  },
  Query: {
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: { metadata: true, volume: true, actresses: true, fetishes: true },
      });

      return movie ? transformMovie(movie) : undefined;
    },
    randomMovie: async (_parent, _args, { prisma }) =>
      prisma.movie
        .count()
        .then(count =>
          prisma.movie.findMany({
            include: { metadata: true, volume: true },
            skip: Math.floor(Math.random() * count),
            take: 1,
          }),
        )
        .then(movies => movies[0])
        .then(transformMovie),
  },
};
