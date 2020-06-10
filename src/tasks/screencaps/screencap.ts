import { MovieGetPayload } from '@prisma/client';
import path from 'path';

export const takeScreencapsForMovie = (
  movie: MovieGetPayload<{ select: { path: true }; include: { volume: true } }>,
) => {
  const moviePath = path.join(movie.volume.path, movie.path);
  console.log(moviePath);
};
