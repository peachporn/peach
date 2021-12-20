import * as path from 'path';
import { execP } from '@peach/utils';
import { init } from 'ramda';
import { ConvertableMovie } from './types';

export const extensionToMp4 = (file: string) => `${init(file.split('.')).join('.')}.mp4`;

export const convertMovieToMp4 = (movie: ConvertableMovie) => {
  const moviePath = path.join(movie.volume.path, movie.path);

  return execP(
    [
      'ffmpeg',
      `-i "${moviePath}"`,
      '-c:v libx264',
      '-crf 23',
      '-v error',
      `${extensionToMp4(moviePath)}`,
    ].join(' '),
  );
};
