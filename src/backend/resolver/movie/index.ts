import { transformMovie } from '../../transformers/movie';
import { Resolvers} from '../../generated/resolver-types';

export const movieResolvers: Resolvers = {
  Query: {
    movieCount: (_parent, _args, { prisma }) => prisma.movie.count(),
    movieList: (_parent, { skip }, { prisma }) =>
      prisma.movie
        .findMany({
          skip,
        })
        .then(movies => movies.map(transformMovie)),
  },
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
