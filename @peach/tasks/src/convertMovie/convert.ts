import * as path from 'path';
import { execP } from '@peach/utils/src/exec';
import { logScope } from '@peach/utils/src/logging';
import { init, last } from 'ramda';
import { ConvertableMovie } from './types';

const log = logScope('convert-movie');

export const extensionToMp4 = (file: string) => `${init(file.split('.')).join('.')}.mp4`;
export const extension = (file: string) => last(file.split('.'));

export const convertMovieToMp4 = (movie: ConvertableMovie) => {
  const moviePath = path.join(movie.volume.path, movie.path);
  if (extension(moviePath) === 'mp4') {
    log.info(`Movie ${moviePath} is already mp4, returning...`);
    return Promise.resolve();
  }

  const command = [
    'ffmpeg',
    `-i "${moviePath}"`,
    '-c:v libx264',
    '-crf 23',
    '-v error',
    `"${extensionToMp4(moviePath)}"`,
  ].join(' ');

  log.info(`Running command: ${command}`);

  return execP(command);
};
