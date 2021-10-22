import path from 'path';
import { Prisma } from '@prisma/client';
import { prisma } from '@peach/utils';

export const fullPath = (movie: Prisma.MovieGetPayload<{ include: { volume: true } }>) =>
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
