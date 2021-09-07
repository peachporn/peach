import { without } from 'ramda';
import { fullPath, moviePathForId } from '@peach/domain';
import { promises } from 'fs';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

const { unlink } = promises;

export const deleteMovieResolvers: Resolvers = {
  Mutation: {
    deleteMovie: async (_parent, { movieId }, { prisma }) => {
      const movieFilePath = await moviePathForId(movieId);

      if (movieFilePath) {
        await unlink(movieFilePath);
      }

      const metadata = await prisma.movieMetadata.findMany({
        where: {
          movieId,
        },
      });

      await Promise.all(metadata.map(m => prisma.movieMetadata.delete({ where: { id: m.id } })));

      return prisma.movie
        .delete({
          where: {
            id: movieId,
          },
        })
        .then(transformMovie);
    },
  },
};
