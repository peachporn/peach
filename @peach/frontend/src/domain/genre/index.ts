import { GenreCategory } from '@peach/types';

export const genreCategories: GenreCategory[] = [
  'Position',
  'Location',
  'Clothing',
  'Practice',
  'Film',
  'Feature',
  'BodyPart',
];

export const colorCodeKinkiness = (kinkiness: number) =>
  kinkiness < 6
    ? 'pink-lighter'
    : kinkiness < 16
    ? 'purple'
    : kinkiness < 26
    ? 'yellow'
    : kinkiness < 36
    ? 'pink'
    : 'offBlack';
