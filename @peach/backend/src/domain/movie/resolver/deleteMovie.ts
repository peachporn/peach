import { moviePathForId } from '@peach/domain';
import { deleteIfExists } from '@peach/utils/src/delete';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../transformer/movie';

export const deleteMovieResolvers: Resolvers = {
  Mutation: {
    deleteMovie: async (_parent, { movieId }, { prisma }) => {
      const movieFilePath = await moviePathForId(movieId);

      if (movieFilePath) {
        await deleteIfExists(movieFilePath);
      }

      const metadata = await prisma.movieMetadata.findMany({
        where: {
          movieId,
        },
      });

      await Promise.all(metadata.map(m => prisma.movieMetadata.delete({ where: { id: m.id } })));

      const movie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!movie) return;

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
