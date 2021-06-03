import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const movieResolvers: Resolvers = {
  Movie: {
    videoUrl: parent => `/assets/movie/${parent.id}`,
    untouched: parent =>
      !(parent.actresses.length !== 0 || parent.fetishes.length !== 0 || !!parent.website),
  },
  Query: {
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: { metadata: true, volume: true, actresses: true, fetishes: true, website: true },
      });

      return movie ? transformMovie(movie) : undefined;
    },
  },
};
