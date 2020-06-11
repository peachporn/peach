import path from 'path';
import { difference, range } from 'ramda';
import { promises } from 'fs';
import mkdirp from 'mkdirp';
import { prisma } from '../../prisma';
import { fullPath } from '../../domain/movie/path';
import { ScreencapMovie } from './type';

const { readdir } = promises;

export const SCREENCAP_NUM = 5;

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

export const missingScreencaps = async (movie: ScreencapMovie) => {
  const screencapPath = await movieScreencapPath(movie);

  await mkdirp(screencapPath);

  const existing = await existingScreencaps(screencapPath);
  const target = screencapFilenames(movie.id);

  return difference(target, existing).map(filename => path.join(screencapPath, filename));
};

export const hasMissingScreencaps = (movie: ScreencapMovie) =>
  missingScreencaps(movie).then(missing => !!missing.length);
