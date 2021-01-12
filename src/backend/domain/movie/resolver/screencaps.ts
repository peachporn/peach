import { indexFromFilename, movieScreencaps } from '../../../../domain/screencaps';
import { Resolver, Resolvers } from '../../../generated/resolver-types';
import { nonNullish } from '../../../../utils/list';

const resolveScreencaps: Resolver<Screencap[], Pick<Movie, 'id' | 'cover'>> = parent =>
  movieScreencaps(parent.id)
    .then(files =>
      nonNullish(
        files
          .map(file => {
            const index = indexFromFilename(file);
            console.log(index, parent.cover);
            return {
              src: `/assets/screencaps/${parent.id}/${file}`,
              index,
              cover: parent.cover === index,
            };
          })
          .filter(s => s.index) as Screencap[],
      ),
    )
    .catch(() => []);

export const screencapsResolvers: Resolvers = {
  Movie: {
    screencaps: resolveScreencaps,
  },
  MovieListMovie: {
    screencaps: resolveScreencaps,
  },
};
