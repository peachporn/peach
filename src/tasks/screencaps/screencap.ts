import path from 'path';
import { fullPath } from '../../domain/movie/path';
import { ScreencapMovie } from './type';
import { SCREENCAP_NUM } from './util';

export const screencapCommand = (screencapPath: string, movie: ScreencapMovie) => {
  if (!movie.metadata) {
    throw new Error(
      'Cannot create screencaps for movie without metadata! Maybe you forgot to include it in the query?',
    );
  }

  if (!movie.volume) {
    throw new Error(
      'Cannot create screencaps for movie without volume! Maybe you forgot to include it in the query?',
    );
  }

  const i = parseInt(screencapPath.split('.jpg')[0].slice(-2), 10);

  const offsetMultiplier =
    i === 0 ? 1.5 : i === 1 ? 1.5 : i === SCREENCAP_NUM ? SCREENCAP_NUM - 0.5 : i;

  const offset = Math.floor((movie.metadata.durationSeconds / SCREENCAP_NUM) * offsetMultiplier);

  return [
    'ffmpeg',
    '-y',
    '-i',
    `'${fullPath(movie)}'`,
    '-ss',
    offset.toString(),
    '-frames:v',
    '1',
    '-f',
    'image2',
    screencapPath,
  ].join(' ');
};
