import { without } from 'ramda';
import { transformMovie, transformMovieListMovie } from '../../transformers/movie';
import { Resolvers } from '../../generated/resolver-types';
import { resolveScreencaps } from './screencaps';
import { resolveGenreDefinition, serializeGenreDefinitionGenre } from './genreDefinition';
import { GenreLinkRaw } from '../../../domain/movie/genreDefinition';

export const movieResolvers: Resolvers = {
  MovieListMovie: {
    screencaps: resolveScreencaps,
  },
  Movie: {
    genres: (parent, _args, { prisma }) =>
      prisma.genreDefinition
        .findMany({
          where: {
            movieId: parent.id,
          },
        })
        .then(genreDefinitions => genreDefinitions.map(resolveGenreDefinition(prisma))),
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
        include: { metadata: true, volume: true, actresses: true, genres: true },
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
    updateGenreDefinitions: async (_parent, { movieId, genreDefinitions }, { prisma }) => {
      const movie = await prisma.movie.findOne({
        where: { id: movieId },
        include: {
          genres: true,
        },
      });

      const movieGenreDefinitions = (movie && movie.genres) || [];

      const updateGenreDefinitions = movieGenreDefinitions
        .map(genreDefinition => {
          const updateGenreDefinitionData = genreDefinitions.find(
            g => g.timeStart === genreDefinition.timeStart,
          );
          if (updateGenreDefinitionData) {
            return {
              ...genreDefinition,
              timeStart: updateGenreDefinitionData.timeStart,
              timeEnd: updateGenreDefinitionData.timeEnd,
              genre: serializeGenreDefinitionGenre(updateGenreDefinitionData.genre as GenreLinkRaw),
            };
          }
          return null;
        })
        .filter(Boolean);

      const removedGenreDefinitions = movieGenreDefinitions.filter(
        s => !updateGenreDefinitions.map(ss => ss && ss.id).includes(s.id),
      );

      const addedGenreDefinitions = genreDefinitions
        .map(genreDefinition => {
          if (movie && !movie.genres.find(g => g.timeStart === genreDefinition.timeStart)) {
            return {
              timeStart: genreDefinition.timeStart,
              timeEnd: genreDefinition.timeEnd,
              genre: serializeGenreDefinitionGenre(genreDefinition.genre as GenreLinkRaw),
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
          genres: {
            create: addedGenreDefinitions.map(s => ({
              timeStart: s!.timeStart,
              timeEnd: s!.timeEnd,
              genre: s!.genre,
            })),
          },
        },
      });

      await prisma.genreDefinition.deleteMany({
        where: {
          id: {
            in: removedGenreDefinitions.map(s => s && s.id).filter(Boolean) as number[],
          },
        },
      });

      await Promise.all(
        updateGenreDefinitions.map(s =>
          prisma.genreDefinition.update({
            where: {
              id: s!.id,
            },
            data: {
              timeStart: s!.timeStart,
              timeEnd: s!.timeEnd,
              genre: s!.genre,
            },
          }),
        ),
      );

      return prisma.movie
        .findOne({
          where: { id: movieId },
          include: {
            genres: true,
          },
        })
        .then(m => (m ? transformMovie(m) : undefined));
    },
  },
};
