import { Prisma } from '@peach/utils/src/prisma';

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
