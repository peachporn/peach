import { prisma } from '../../prisma';
import { enqueueScreencaps } from './enqueue';
import { hasMissingScreencaps } from './definitions';

export const takeScreencapsForAllMovies = async () => {
  prisma.movie
    .findMany({
      include: {
        metadata: true,
        volume: true,
      },
    })
    .then(movies =>
      movies.map(async movie => {
        const missing = await hasMissingScreencaps(movie);
        return missing ? enqueueScreencaps({ movie, mode: 'allMissing' }) : Promise.resolve();
      }),
    );
};

export * from './take';
export * from './enqueue';
