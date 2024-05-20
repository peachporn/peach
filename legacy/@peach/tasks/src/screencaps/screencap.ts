import path from 'path';
import { fullPath, NUMBER_OF_SCREENCAPS } from '@peach/domain';
import { ScreencapMovie } from './type';

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
    i === 0 ? 1.5 : i === 1 ? 1.5 : i === NUMBER_OF_SCREENCAPS ? NUMBER_OF_SCREENCAPS - 0.5 : i;

  const offset = Math.floor(
    (movie.metadata.durationSeconds / NUMBER_OF_SCREENCAPS) * offsetMultiplier,
  );

  return [
    'ffmpeg',
    '-v',
    'debug',
    '-y',
    '-i',
    `"${fullPath(movie)}"`,
    '-ss',
    offset.toString(),
    '-frames:v',
    '1',
    '-f',
    'image2',
    screencapPath,
  ].join(' ');
};
