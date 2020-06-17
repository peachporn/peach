import { ActressGetPayload, Actress as DBActress } from '@prisma/client';
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
  id: actress.id,
  name: actress.name,
  aliases: actress.aliases ? JSON.parse(actress.aliases) : [],
  piercings: actress.piercings ? JSON.parse(actress.piercings) : [],
  measurements: JSON.parse(actress.measurements),
  tattoos: actress.tattoos ? JSON.parse(actress.tattoos) : [],
  movies: (actress.movies || []).map(transformMovie),
});
