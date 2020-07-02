import path from 'path';
import { range } from 'ramda';
import mkdirp from 'mkdirp';
import { fullPath } from '../../domain/movie/path';
import { ScreencapMovie } from './type';
import { movieScreencapPath, movieScreencapsFromFolder } from '../../domain/screencaps';

export const SCREENCAP_NUM = 5;

const screencapFilenames = (movieId: number) =>
  range(1, SCREENCAP_NUM + 1).map(num => {
    const s = num.toString();
    return {
      index: num,
      filename: `${movieId}-${s.length === 1 ? `0${s}` : s}.jpg`,
    };
  });

export const missingScreencaps = async (movie: ScreencapMovie) => {
  const screencapPath = await movieScreencapPath(movie);

  await mkdirp(screencapPath);

  const existing = await movieScreencapsFromFolder(screencapPath);
  const target = screencapFilenames(movie.id);
  const difference = target.filter(t => !existing.includes(t.filename));

  return difference.map(s => ({
    ...s,
    filename: path.join(screencapPath, s.filename),
  }));
};

export const hasMissingScreencaps = (movie: ScreencapMovie) =>
  missingScreencaps(movie).then(missing => !!missing.length);
