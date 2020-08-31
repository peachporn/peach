import { GenreDefinitionDraft } from './types';

export type DisplayableGenre = GenreDefinitionDraft & {
  gridColumnStart: number;
  gridColumnSpan: number;
};

const scaleToPercent = (duration: number, time: number) => Math.round((time / duration) * 100);

export const buildGenreGrid = (
  duration: number,
  genreDefinitions: GenreDefinitionDraft[],
): DisplayableGenre[] =>
  genreDefinitions.map(g => ({
    ...g,
    gridColumnStart: Math.min(96, scaleToPercent(duration, g.timeStart)),
    gridColumnSpan: 5 + g.genre.children.length * 5,
  }));
