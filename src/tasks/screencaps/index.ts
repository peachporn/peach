import { prisma } from '../../prisma';
import { hasMissingScreencaps } from './util';
import { enqueueScreencaps } from './enqueue';

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
        return missing ? enqueueScreencaps({ movie }) : Promise.resolve();
      }),
    );
};

export * from './take';
export * from './enqueue';
