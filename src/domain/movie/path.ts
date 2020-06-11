import { MovieGetPayload } from '@prisma/client';
import path from 'path';

export const fullPath = (movie: MovieGetPayload<{ include: { volume: true } }>) =>
  path.join(movie.volume.path, movie.path);
