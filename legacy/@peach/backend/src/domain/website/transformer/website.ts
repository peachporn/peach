import { Website } from '@peach/types';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { transformMovie } from '../../movie/transformer/movie';
import { WebsiteWithOptionalFetishAndMovies } from './type';

export const transformWebsite = (website: WebsiteWithOptionalFetishAndMovies): Website => ({
  id: website.id,
  name: website.name,
  url: website.url,
  fetish: website.fetish ? transformBaseGenre(website.fetish) : undefined,
  movies: (website.movies || []).map(transformMovie),
});
