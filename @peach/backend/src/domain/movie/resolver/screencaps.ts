import { indexFromFilename, movieScreencaps } from '@peach/domain';
import { Movie, Screencap } from '@peach/types';
import { nonNullish } from '@peach/utils/src/list';
import { Resolvers } from '../../../generated/resolver-types';

const resolveScreencaps = (movie: Pick<Movie, 'id' | 'cover'>): Promise<Screencap[]> =>
  movieScreencaps(movie.id)
    .then(files =>
      nonNullish(
        files
          .map(file => {
            const index = indexFromFilename(file);
            return {
              src: `/assets/screencaps/${movie.id}/${file}`,
              index,
              cover: movie.cover === index,
            };
          })
          .filter(s => s.index) as Screencap[],
      ),
    )
    .catch(() => []);

export const screencapsResolvers: Resolvers = {
  Movie: {
    screencaps: resolveScreencaps,
    coverPicture: parent =>
      resolveScreencaps(parent).then(screencaps => screencaps.find(s => s.cover)),
  },
};
