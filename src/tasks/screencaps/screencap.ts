import { MovieGetPayload } from '@prisma/client';
import path from 'path';
import { difference, range } from 'ramda';
import { promises } from 'fs';
import mkdirp from 'mkdirp';
import { prisma } from '../../prisma';
import { fullPath } from '../../domain/movie/path';
import { sequence } from '../../utils/promise';
import { execP } from '../../utils/exec';
import { logScope } from '../../utils/logging';

const { readdir } = promises;
const log = logScope('screencaps');

type ScreencapMovie = MovieGetPayload<{
  select: { path: true };
  include: { volume: true; metadata: true };
}>;

const SCREENCAP_NUM = 5;

const existingScreencaps = (p: string) =>
  readdir(p).then(files => files.filter(f => f.endsWith('.jpg')));

const screencapFilenames = (movieId: number) =>
  range(1, SCREENCAP_NUM + 1).map(num => {
    const s = num.toString();
    return `${movieId}-${s.length === 1 ? `0${s}` : s}.jpg`;
  });

const movieScreencapPath = async (movie: ScreencapMovie) => {
  const screencapsPath = await prisma.settings
    .findMany()
    .then(settings => (settings.length ? settings[0].screencapPath : null));

  if (!screencapsPath) {
    throw new Error('No screencap path configured!');
  }

  return path.join(screencapsPath, `${movie.id}`);
};

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

export const takeScreencapsForMovie = async (movie: ScreencapMovie) => {
  const screencapPath = await movieScreencapPath(movie);
  await mkdirp(screencapPath);
  const existing = await existingScreencaps(screencapPath);
  const target = screencapFilenames(movie.id);

  const missingScreencaps = difference(target, existing);

  return sequence(
    missingScreencaps
      .map(s => screencapCommand(path.join(screencapPath, s), movie))
      .map(command => () => execP(command)),
  );
};
