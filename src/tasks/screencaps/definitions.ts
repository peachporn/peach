import path from 'path';
import { range } from 'ramda';
import mkdirp from 'mkdirp';
import { fullPath } from '../../domain/movie';
import { ScreencapMovie } from './type';
import {
  DEFAULT_COVER_SCREENCAP_INDEX,
  movieScreencapPath,
  movieScreencapsFromFolder,
  NUMBER_OF_SCREENCAPS,
  screencapFilename,
} from '../../domain/screencaps';

type ScreencapDefinition = {
  index: number;
  filename: string;
};

const allScreencapDefinitions = (movieId: number) =>
  range(1, NUMBER_OF_SCREENCAPS + 1).map(num => ({
    index: num,
    filename: screencapFilename(movieId, num.toString()),
  }));

const screencapDefinitionsForTarget = async (
  movie: ScreencapMovie,
  target: ScreencapDefinition[],
) => {
  const screencapPath = await movieScreencapPath(movie);

  await mkdirp(screencapPath);

  const existing = await movieScreencapsFromFolder(screencapPath);
  const difference = target.filter(t => !existing.includes(t.filename));

  return difference.map(s => ({
    ...s,
    filename: path.join(screencapPath, s.filename),
  }));
};

export const criticalScreencapDefinitions = async (
  movie: ScreencapMovie,
): Promise<ScreencapDefinition[]> => {
  const all = allScreencapDefinitions(movie.id);
  const critical = all.filter(d => d.index === DEFAULT_COVER_SCREENCAP_INDEX);
  if (!critical.length) return Promise.reject();
  return screencapDefinitionsForTarget(movie, critical);
};

export const allMissingScreencapDefinitions = async (
  movie: ScreencapMovie,
): Promise<ScreencapDefinition[]> =>
  screencapDefinitionsForTarget(movie, allScreencapDefinitions(movie.id));

export const hasMissingScreencaps = (movie: ScreencapMovie) =>
  allMissingScreencapDefinitions(movie).then(missing => !!missing.length);
