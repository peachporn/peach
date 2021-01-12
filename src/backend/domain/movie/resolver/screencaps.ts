import { movieScreencaps } from '../../../../domain/screencaps';
import { Resolver, Resolvers } from '../../../generated/resolver-types';

const resolveScreencaps: Resolver<string[], Pick<Movie, 'id'>> = parent =>
  movieScreencaps(parent.id)
    .then(files => files.map(file => `/assets/screencaps/${parent.id}/${file}`))
    .catch(() => []);

export const screencapResolvers: Resolvers = {
  Movie: {
    screencaps: resolveScreencaps,
  },
  MovieListMovie: {
    screencaps: resolveScreencaps,
  },
};
