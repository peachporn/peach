import glob from 'glob';
import { Movie, Volume } from '@prisma/client';
import * as path from 'path';
import { movieFormats } from '../../domain/movie';
import { getInferMovieTitle } from '../../domain/settings';
import { logScope } from '../../utils';
import { prisma } from '../../prisma';
import { sequence } from '../../utils/promise';

const log = logScope('scan-library');

const globP = (globExpr: string): Promise<string[]> =>
  new Promise((resolve, reject) =>
    glob(globExpr, (error, files) => {
      if (error) {
        return reject(error);
      }
      return resolve(files);
    }),
  );

const extensionsGlob = `*.@(${movieFormats.join('|')})`;

const existingMoviesByFilenames = (volumePath: string, filenames: string[]): Promise<Movie[]> =>
  prisma.movie.findMany({
    include: {
      metadata: true,
    },
    where: {
      AND: {
        path: {
          in: filenames.map(name => name.replace(volumePath, '')),
        },
        volume: {
          path: volumePath,
        },
      },
    },
  });

const lastSegment = (p: string) => {
  const segments = p.split('/');
  return segments[segments.length - 1];
};

const titleFromFolder = (moviePath: string) => lastSegment(path.dirname(moviePath));
const titleFromFilename = (moviePath: string) => lastSegment(moviePath);

const createMovie = async (
  existingMovies: Movie[],
  volume: Volume,
  moviePath: string,
): Promise<Movie | undefined> => {
  const inferMovieTitleType = await getInferMovieTitle();
  const title =
    inferMovieTitleType === 'FILENAME'
      ? titleFromFilename(moviePath)
      : inferMovieTitleType === 'FOLDER'
      ? titleFromFolder(moviePath)
      : undefined;

  if (!title) {
    log.error(`Couldn't derive title from movie path ${moviePath}`);
    throw new Error('Error running task');
  }

  if (existingMovies.map(m => m.title).includes(title)) {
    log.error(`Movie with title ${title} already exists`);
    return undefined;
  }

  const movie = await prisma.movie.create({
    data: {
      title,
      path: moviePath,
      volume: {
        connect: {
          id: volume.id,
        },
      },
    },
  });

  log.info(`Created movie ${movie.title}`);

  return movie;
};

const trimVolumePath = (volumePath: string) => (filePath: string) =>
  filePath.replace(new RegExp(`^${volumePath}`), '');

export const scanVolume = (volume: Volume): Promise<(Movie | undefined)[]> => {
  const moviesGlob = `${volume.path}/**/${extensionsGlob}`;
  log.debug(`Searching for movies in: ${moviesGlob}`);

  return globP(moviesGlob).then(async movieFiles => {
    const existingMovies = await existingMoviesByFilenames(volume.path, movieFiles);

    const moviesToCreate = movieFiles
      .map(trimVolumePath(volume.path))
      .filter(file => !existingMovies.map(m => m.path).includes(file));
    log.debug(`Found ${moviesToCreate.length} new movies!`);

    return sequence(
      moviesToCreate.map(moviePath => () => createMovie(existingMovies, volume, moviePath)),
    );
  });
};
