import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const movieResolvers: Resolvers = {
  Movie: {
    videoUrl: parent => `/assets/movie/${parent.id}`,
  },
  Query: {
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: { metadata: true, volume: true, actresses: true, fetishes: true },
      });

      return movie ? transformMovie(movie) : undefined;
    },
  },
};
