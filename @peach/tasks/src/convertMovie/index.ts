import { promises } from 'fs';
import path from 'path';
import { prisma } from '@peach/utils';
import { scrapeMetadata } from '../metadata';
import { defineTask } from '../task/template';
import { convertMovieToMp4, extensionToMp4 } from './convert';
import { ConvertableMovie } from './types';

const { unlink } = promises;

type ConvertMovieParameters = {
  movie: ConvertableMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<ConvertMovieParameters>(
  'CONVERT_MOVIE',
  async ({ parameters: { movie } }) =>
    convertMovieToMp4(movie)
      .then(() =>
        prisma.movie.update({
          where: { id: movie.id },
          data: { path: extensionToMp4(movie.path) },
        }),
      )
      .then(() => {
        const oldMoviePath = path.join(movie.volume.path, movie.path);
        Promise.all([scrapeMetadata({ movie }), unlink(oldMoviePath)]);
      })
      .then(() => 'SUCCESS'),
  {
    workers: 1,
  },
);

export const convertMovie = createTask;
export const runConvertMovieTask = runTask;
export const convertMovieDefinitionOptions = taskDefinitionOptions;
