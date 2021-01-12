import { Prisma, Actress as DBActress } from '@prisma/client';
import { transformMovie } from '../../movie/transformer/movie';
import { fromDBActress } from '../../../../domain/actress/db';

type ActressWithOptionalMovies = DBActress &
  Partial<
    Pick<
      Prisma.ActressGetPayload<{
        include: {
          movies: true;
        };
      }>,
      'movies'
    >
  >;

export const transformActress = (actress: ActressWithOptionalMovies): Actress => ({
  ...fromDBActress(actress),
  movies: (actress.movies || []).map(transformMovie),
});
