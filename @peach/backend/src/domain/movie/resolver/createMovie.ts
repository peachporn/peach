import { without } from 'ramda';
import { DEFAULT_COVER_SCREENCAP_INDEX } from '@peach/domain';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const createMovieResolvers: Resolvers = {
  Mutation: {
    createMovieFromFile: async (_parent, { input: { title, location, actors } }, { prisma }) =>
      prisma.movie
        .create({
          include: {
            metadata: true,
          },
          data: {
            title,
            actors: actors || 0,
            cover: DEFAULT_COVER_SCREENCAP_INDEX,
            path: location.filePath,
            volume: {
              connect: {
                name: location.volumeName,
              },
            },
          },
        })
        .then(transformMovie),
  },
};
