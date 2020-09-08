import { GenreDefinitionDraft } from './types';

export type DisplayableGenre = GenreDefinitionDraft & {
  gridColumnStart: number;
  gridColumnSpan: number;
};

const scaleToPercent = (duration: number, time: number) =>
  duration === 1 ? 0 : Math.round((time / duration) * 100);

export const buildGenreGrid = (
  duration: number,
  genreDefinitions: GenreDefinitionDraft[],
): DisplayableGenre[] => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : null;

  if (!windowWidth) {
    return [];
  }

  // These magic numbers stem from the genre clip and typography sizes
  // 3.5em width, font-size: 20px for mobile, 900px breakpoint medium, font-size: 14px for desktop
  const isMobile = windowWidth < 900;
  const emInPx = isMobile ? 20 : 14;
  const genreClipSizeInPx = 3.5 * emInPx;

  const columnWidthInPx = windowWidth / 100;
  const pxToColumns = (px: number) => px / columnWidthInPx;

  const genreClipSizeInColumns = pxToColumns(genreClipSizeInPx);
  const descriptionSlotPaddingInColumns = pxToColumns(0.2 * emInPx * 2);
  // This magic number comes from the tiny genre clip size: font-size 0.5em
  const descriptionSlotGenreSizeInColumns = genreClipSizeInColumns / 2;

  const childrenSizeInColumns = (g: GenreDefinitionDraft) =>
    g.genre.children.length <= 0
      ? 0
      : Math.ceil(
          descriptionSlotPaddingInColumns +
            descriptionSlotGenreSizeInColumns * g.genre.children.length,
        );

  return genreDefinitions.map(g => {
    const totalSize = Math.ceil(genreClipSizeInColumns + childrenSizeInColumns(g));

    return {
      ...g,
      gridColumnStart: Math.min(100 - totalSize, scaleToPercent(duration, g.timeStart)),
      gridColumnSpan: totalSize,
    };
  });
};
