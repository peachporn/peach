import { without } from 'ramda';
import { transformMovie, transformMovieListMovie } from '../../transformers/movie';
import { Resolvers } from '../../generated/resolver-types';
import { resolveScreencaps } from './screencaps';
import { resolveGenreDefinition, serializeGenreDefinitionGenre } from './genreDefinition';
import { GenreLinkRaw } from '../../../domain/movie/genreDefinition';
import { applyFilter } from './filter';

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
    movies: (_parent, { limit, skip, filter }, { prisma }) =>
      prisma.movie
        .findMany({
          skip: skip || 0,
          take: limit || 30,
          ...applyFilter(filter),
          include: {
            genres: true,
          },
        })
        .then(movies => movies.map(transformMovieListMovie)),
    movie: async (_parent, { id }, { prisma }) => {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: { metadata: true, volume: true, actresses: true, genres: true, fetishes: true },
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
    setMovieFetishes: async (_parent, { movieId, genreIds }, { prisma }) =>
      prisma.movie
        .update({
          where: {
            id: movieId,
          },
          include: {
            fetishes: true,
          },
          data: {
            fetishes: {
              set: genreIds.map(id => ({ id })),
            },
          },
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
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: {
          genres: true,
        },
      });

      const movieGenres = !movie ? [] : movie.genres;

      await prisma.genreDefinition.deleteMany({
        where: {
          id: {
            in: movieGenres.map(g => g.id),
          },
        },
      });

      await prisma.movie.update({
        where: {
          id: movieId,
        },
        data: {
          genres: {
            create: genreDefinitions.map(genreDefinition => ({
              timeStart: genreDefinition.timeStart,
              timeEnd: genreDefinition.timeEnd,
              genre: serializeGenreDefinitionGenre(genreDefinition.genre as GenreLinkRaw),
            })),
          },
        },
      });

      return prisma.movie
        .findUnique({
          where: { id: movieId },
          include: {
            genres: true,
          },
        })
        .then(m => (m ? transformMovie(m) : undefined));
    },
  },
};
