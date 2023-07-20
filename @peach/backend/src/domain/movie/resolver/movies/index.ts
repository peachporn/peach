import { Resolvers } from '../../../../generated/resolver-types';
import { transformMovie } from '../../transformer/movie';
import { applyMovieFilter } from './filter';
import { resolveMovies } from './list';
import { resolveRandomMovies } from './random';

export const moviesResolvers: Resolvers = {
  Query: {
    movies: async (parent, args, context) => {
      const filteredCount = await context.prisma.movie.count({
        ...applyMovieFilter(args.filter),
      });

      return (args.sort === 'RANDOM' ? resolveRandomMovies : resolveMovies)(args, context).then(
        movies => ({
          total: filteredCount,
          movies: movies.map(transformMovie),
        }),
      );
    },
  },
};
