import { Resolver } from '../../generated/resolver-types';
import { movieScreencaps } from '../../../domain/screencaps';

export const resolveScreencaps: Resolver<string[], Pick<Movie, 'id'>> = parent =>
  movieScreencaps(parent.id).then(files =>
    files.map(file => `/assets/screencaps/${parent.id}/${file}`),
  );
