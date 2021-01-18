import { Prisma, Actress as DBActress } from '@peach/utils';
import { fromDBActress } from '@peach/domain';
import { Actress } from '@peach/types';
import { transformMovie } from '../../movie/transformer/movie';

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
