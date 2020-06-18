import { ActressGetPayload, Actress as DBActress } from '@prisma/client';
import { transformActressBase } from './actress-base';
import { transformMovie } from './movie';

type ActressWithOptionalMovies = DBActress &
  Partial<
    Pick<
      ActressGetPayload<{
        include: {
          movies: true;
        };
      }>,
      'movies'
    >
  >;

export const transformActress = (actress: ActressWithOptionalMovies): Actress => ({
  ...transformActressBase(actress),
  movies: (actress.movies || []).map(transformMovie),
});
