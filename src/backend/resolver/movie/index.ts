import { without } from 'ramda';
import { transformMovie, transformMovieListMovie } from '../../transformers/movie';
import { Resolvers } from '../../generated/resolver-types';
import { resolveScreencaps } from './screencaps';
import { resolveScene, serializeSceneGenres } from './scene';
import { GenreLinkRaw } from '../../../domain/movie/scene';

export const movieResolvers: Resolvers = {
  MovieListMovie: {
    screencaps: resolveScreencaps,
  },
  Movie: {
    scenes: (parent, _args, { prisma }) =>
      prisma.scene
        .findMany({
          where: {
            movieId: parent.id,
          },
        })
        .then(scenes => scenes.map(resolveScene(prisma))),
    screencaps: resolveScreencaps,
    url: parent => `/assets/movie/${parent.id}`,
  },
  Query: {
    movieCount: (_parent, _args, { prisma }) => prisma.movie.count(),
    movies: (_parent, { limit, skip }, { prisma }) =>
      prisma.movie
        .findMany({
          skip: skip || 0,
          take: limit || 30,
        })
        .then(movies => movies.map(transformMovieListMovie)),
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findOne({
        where: { id },
        include: { metadata: true, volume: true, actresses: true, scenes: true },
      });

      return movie ? transformMovie(movie) : undefined;
    },
    randomMovie: async (_parent, _args, { prisma }) =>
      prisma.movie
        .count()
        .then(count =>
          prisma.movie.findMany({
            include: { metadata: true, volume: true },
            skip: Math.floor(Math.random() * count),
            take: 1,
          }),
        )
        .then(movies => movies[0])
        .then(transformMovie),
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
    updateMovie: async (_parent, { movieId, data }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          data,
        })
        .then(transformMovie),
    addActressToMovie: async (_parent, { movieId, actressId }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            actresses: true,
          },
          data: {
            actresses: {
              connect: {
                id: actressId,
              },
            },
          },
        })
        .then(transformMovie),
    removeActressFromMovie: async (_parent, { movieId, actressId }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            actresses: true,
          },
          data: {
            actresses: {
              disconnect: {
                id: actressId,
              },
            },
          },
        })
        .then(transformMovie),
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
    updateScenes: async (_parent, { movieId, scenes }, { prisma }) => {
      const movie = await prisma.movie.findOne({
        where: { id: movieId },
        include: {
          scenes: true,
        },
      });

      const movieScenes = (movie && movie.scenes) || [];

      const updatedScenes = movieScenes
        .map(scene => {
          const updateSceneData = scenes.find(s => s.timeStart === scene.timeStart);
          if (updateSceneData) {
            return {
              ...scene,
              timeStart: updateSceneData.timeStart,
              timeEnd: updateSceneData.timeEnd,
              genres: serializeSceneGenres(updateSceneData.genres as GenreLinkRaw[]),
            };
          }
          return null;
        })
        .filter(Boolean);

      const removedScenes = movieScenes.filter(
        s => !updatedScenes.map(ss => ss && ss.id).includes(s.id),
      );

      const addedScenes = scenes
        .map(scene => {
          if (movie && !movie.scenes.find(s => s.timeStart === scene.timeStart)) {
            return {
              timeStart: scene.timeStart,
              timeEnd: scene.timeEnd,
              genres: serializeSceneGenres(scene.genres as GenreLinkRaw[]),
            };
          }
          return null;
        })
        .filter(Boolean);

      await prisma.movie.update({
        where: {
          id: movieId,
        },
        data: {
          scenes: {
            create: addedScenes.map(s => ({
              timeStart: s!.timeStart,
              timeEnd: s!.timeEnd,
              genres: s!.genres,
            })),
          },
        },
      });

      await prisma.scene.deleteMany({
        where: {
          id: {
            in: removedScenes.map(s => s && s.id).filter(Boolean) as number[],
          },
        },
      });

      await Promise.all(
        updatedScenes.map(s =>
          prisma.scene.update({
            where: {
              id: s!.id,
            },
            data: {
              timeStart: s!.timeStart,
              timeEnd: s!.timeEnd,
              genres: s!.genres,
            },
          }),
        ),
      );

      return prisma.movie
        .findOne({
          where: { id: movieId },
          include: {
            scenes: true,
          },
        })
        .then(m => (m ? transformMovie(m) : undefined));
    },
  },
};
