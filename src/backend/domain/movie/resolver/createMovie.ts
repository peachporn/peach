import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const createMovieResolvers: Resolvers = {
  Mutation: {
    createMovieFromFile: async (_parent, { input: { title, location, actors } }, { prisma }) => {
      const movie = await prisma.movie.create({
        include: {
          metadata: true,
        },
        data: {
          title,
          actors: actors || 0,
          cover: 2,
          path: location.filePath,
          volume: {
            connect: {
              name: location.volumeName,
            },
          },
        },
      });

      return transformMovie(movie);
    },
  },
};
