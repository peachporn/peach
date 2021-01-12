import { without } from 'ramda';
import { transformMovie } from '../transformer/movie';
import { Resolvers } from '../../../generated/resolver-types';

export const deleteMovieResolvers: Resolvers = {
  Mutation: {
    deleteMovie: async (_parent, { movieId }, { prisma }) => {
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
