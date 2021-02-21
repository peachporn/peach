import { Prisma } from '@peach/utils';

export type WebsiteWithOptionalFetishAndMovies = Omit<
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
