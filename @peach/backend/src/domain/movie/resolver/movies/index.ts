import { Resolvers } from '../../../../generated/resolver-types';
import { transformMovie } from '../../transformer/movie';
import { applyMovieFilter } from './filter';
import { resolveRandomMovies } from './random';
import { resolveMovies } from './resolveMovies';

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
