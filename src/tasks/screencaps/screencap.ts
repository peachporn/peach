import path from 'path';
import { fullPath } from '../../domain/movie/path';
import { sequence } from '../../utils/promise';
import { execP } from '../../utils/exec';
import { logScope } from '../../utils/logging';
import { ScreencapMovie } from './type';
import { missingScreencaps, SCREENCAP_NUM } from './util';

const log = logScope('screencaps');

const screencapCommand = (screencapPath: string, movie: ScreencapMovie) => {
  if (!movie.metadata) {
    throw new Error('Cannot create screencaps for movie without metadata!');
  }

  const i = parseInt(screencapPath.split('.jpg')[0].slice(-2), 10);

  const offsetMultiplier =
    i === 0 ? 1.5 : i === 1 ? 1.5 : i === SCREENCAP_NUM ? SCREENCAP_NUM - 0.5 : i;

  const offset = Math.floor((movie.metadata.durationSeconds / SCREENCAP_NUM) * offsetMultiplier);

  const command = [
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
  log.debug(`Running command: ${command}`);
  return command;
};

export const takeScreencapsForMovie = async (movie: ScreencapMovie) =>
  missingScreencaps(movie).then(missing =>
    sequence(missing.map(s => screencapCommand(s, movie)).map(command => () => execP(command))),
  );
