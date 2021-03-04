import { prisma } from '@peach/utils';
import { hasMissingScreencaps } from './definitions';
import { takeScreencap } from './take';

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
        return missing ? takeScreencap({ movie }) : Promise.resolve();
      }),
    );
};

export * from './take';
