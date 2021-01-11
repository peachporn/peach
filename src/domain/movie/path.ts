import { MovieGetPayload } from '@prisma/client';
import path from 'path';
import { prisma } from '../../prisma';

export const fullPath = (movie: MovieGetPayload<{ include: { volume: true } }>) =>
  path.join(movie.volume.path, movie.path);

export const moviePathForId = (movieId: number): Promise<string | undefined> =>
  prisma.movie
    .findUnique({
      where: { id: movieId },
      include: {
        volume: true,
      },
    })
    .then(movie => (movie ? fullPath(movie) : Promise.resolve(undefined)));
