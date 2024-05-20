import { GenreActionCardFragment } from '@peach/types';

export type GenreDefinitionDraft = {
  timeStart: number;
  genre: GenreLink;
};

export type GenreLink = {
  parent: GenreActionCardFragment;
  children: GenreActionCardFragment[];
};
