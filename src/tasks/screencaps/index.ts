import { logScope } from '../../utils';
import { defineTask } from '../task/template';
import { prisma } from '../../prisma';
import { takeScreencapsForMovie } from './screencap';
import { hasMissingScreencaps } from './util';
import { ScreencapMovie } from './type';

const log = logScope('screencaps');

type TakeScreencapParams = {
  movie: ScreencapMovie;
};

const { createTask, runTask } = defineTask<TakeScreencapParams>(
  'TAKE_SCREENCAPS',
  async ({ parameters: { movie } }) => {
    try {
      await takeScreencapsForMovie(movie);

      return 'SUCCESS';
    } catch (e) {
      log.error(e);
      return 'ERROR';
    }
  },
  {
    workers: 1,
  },
);

export const takeScreencaps = createTask;
export const runTakeScreencapTask = runTask;

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
        return missing ? takeScreencaps({ movie }) : Promise.resolve();
      }),
    );
};
