import { transformMovie } from '../../transformers/movie';
import { Resolvers } from '../../generated/resolver-types';
import { getScreencapPath } from '../../../domain/settings';
import { movieScreencaps } from '../../../domain/screencaps';
import { moviePathForId } from '../../../domain/movie';

export const movieResolvers: Resolvers = {
  Movie: {
    screencaps: parent =>
      movieScreencaps(parent.id).then(files =>
        files.map(file => `/assets/screencaps/${parent.id}/${file}`),
      ),
    url: parent => `/assets/movie/${parent.id}`,
  },
  Query: {
    movieCount: (_parent, _args, { prisma }) => prisma.movie.count(),
    movieList: (_parent, { skip }, { prisma }) =>
      prisma.movie
        .findMany({
          skip,
        })
        .then(movies => movies.map(transformMovie)),
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findOne({ where: { id }, include: { metadata: true } });

      return movie ? transformMovie(movie) : undefined;
    },
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
