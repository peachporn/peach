import * as path from 'path';
import { execP } from '@peach/utils/src/exec';
import { logScope } from '@peach/utils/src/logging';
import { init } from 'ramda';
import { ConvertableMovie } from './types';

const log = logScope('convert-movie');

export const extensionToMp4 = (file: string) => `${init(file.split('.')).join('.')}.mp4`;

export const convertMovieToMp4 = (movie: ConvertableMovie) => {
  const moviePath = path.join(movie.volume.path, movie.path);
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
