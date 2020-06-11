import { logScope } from '../../utils';
import { defineTask } from '../task/template';
import { prisma } from '../../prisma';
import { takeScreencapsForMovie } from './screencap';

const log = logScope('screencaps');

type TakeScreencapParams = {
  movieId: number;
};

const { createTask, runTask } = defineTask<TakeScreencapParams>(
  'TAKE_SCREENCAPS',
  async ({ parameters: { movieId } }) => {
    try {
      const movie = await prisma.movie.findOne({
        where: { id: movieId },
        include: { volume: true, metadata: true },
      });

      if (!movie) {
        throw new Error(`No movie found for id ${movieId}`);
      }
      await takeScreencapsForMovie(movie);
    } catch (e) {
      log.error(e);
    }
  },
  {
    workers: 1,
  },
);

export const takeScreencaps = createTask;
export const runTakeScreencapTask = runTask;
