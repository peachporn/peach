import path from 'path';
import { deleteIfExists } from '@peach/utils/src/delete';
import { prisma } from '@peach/utils/src/prisma';
import { scrapeMetadata } from '../metadata';
import { defineTask } from '../task/template';
import { convertMovieToMp4, extensionToMp4 } from './convert';
import { ConvertableMovie } from './types';

type ConvertMovieParameters = {
  movie: ConvertableMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<ConvertMovieParameters>(
  'CONVERT_MOVIE',
  async ({ parameters: { movie } }) =>
    convertMovieToMp4(movie)
      .then(() =>
        prisma.movieMetadata
          .findUnique({
            where: {
              movieId: movie.id,
            },
          })
          .then(metadata =>
            !metadata
              ? undefined
              : prisma.movieMetadata.delete({
                  where: {
                    movieId: movie.id,
                  },
                }),
          ),
      )
      .then(() =>
        prisma.movie.update({
          where: { id: movie.id },
          data: { path: extensionToMp4(movie.path) },
        }),
      )
      .then(() => {
        const oldMoviePath = path.join(movie.volume.path, movie.path);
        const newMoviePath = extensionToMp4(movie.path);

        Promise.all([
          scrapeMetadata({ movie: { ...movie, path: newMoviePath } }),
          oldMoviePath !== newMoviePath ? deleteIfExists(oldMoviePath) : Promise.resolve(),
        ]);
      })
      .then(() => 'SUCCESS'),
  {
    workers: 1,
  },
);

export const convertMovie = createTask;
export const runConvertMovieTask = runTask;
export const convertMovieDefinitionOptions = taskDefinitionOptions;
