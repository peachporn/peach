import { ActressMovieFilter, FetishMovieFilter, WebsiteMovieFilter } from '@peach/types';
import {
  Actress as DBActress,
  Genre as DBGenre,
  Website as DBWebsite,
} from '@peach/utils/src/prisma';
import { transformActress } from '../../actress/transformer/actress';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { transformBaseWebsite } from '../../website/transformer/baseWebsite';

export const transformActressMovieFilter = (actress: DBActress): ActressMovieFilter => ({
  __typename: 'ActressMovieFilter',
  actress: transformActress(actress),
});

export const transformFetishMovieFilter = (genre: DBGenre): FetishMovieFilter => ({
  __typename: 'FetishMovieFilter',
  genre: transformBaseGenre(genre),
});

export const transformWebsiteMovieFilter = (website: DBWebsite): WebsiteMovieFilter => ({
  __typename: 'WebsiteMovieFilter',
  website: transformBaseWebsite(website),
});
