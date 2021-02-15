import { Prisma } from '@peach/utils';
import { Website } from '@peach/types';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { transformMovie } from '../../movie/transformer/movie';

type WebsiteWithOptionalFetishAndMovies = Omit<
  Prisma.WebsiteGetPayload<{
    include: { fetish: true; movies: true };
  }>,
  'fetish' | 'movies'
> &
  Partial<
    Pick<
      Prisma.WebsiteGetPayload<{
        include: { fetish: true; movies: true };
      }>,
      'fetish' | 'movies'
    >
  >;

export const transformWebsite = (website: WebsiteWithOptionalFetishAndMovies): Website => ({
  id: website.id,
  name: website.name,
  url: website.url,
  fetish: website.fetish ? transformBaseGenre(website.fetish) : undefined,
  movies: (website.movies || []).map(transformMovie),
});
