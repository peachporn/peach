import { Website } from '@peach/types';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { WebsiteWithOptionalFetishAndMovies } from './type';

export const transformBaseWebsite = (website: WebsiteWithOptionalFetishAndMovies): Website => ({
  id: website.id,
  name: website.name,
  url: website.url,
  fetish: website.fetish ? transformBaseGenre(website.fetish) : undefined,
  movies: [],
});
