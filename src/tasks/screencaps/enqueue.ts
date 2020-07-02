import { logScope } from '../../utils';
import { defineTask } from '../task/template';
import { hasMissingScreencaps, missingScreencaps } from './util';
import { ScreencapMovie } from './type';
import { tasksByCategoryAndStatus } from '../task/status';
import { takeScreencap, TakeScreencapParams } from './take';
import { Task } from '..';
import { toTask } from '../task/type';

const log = logScope('screencaps');

type EnqueueScreencapsParams = {
  movie: ScreencapMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<EnqueueScreencapsParams>(
  'ENQUEUE_SCREENCAPS',
  async ({ parameters: { movie } }) => {
    try {
      const runningTakeScreencapTaskIndices = (
        await tasksByCategoryAndStatus('TAKE_SCREENCAP', ['RUNNING', 'ERROR'])
      )
        .map(toTask)
        .map(t => (t as Task<TakeScreencapParams>).parameters.index);

      const missing = await missingScreencaps(movie);

      await Promise.all(
        missing
          .filter(m => !runningTakeScreencapTaskIndices.includes(m.index))
          .map(m => {
            log.debug(`Adding screencapjob: ${JSON.stringify(m)}`);
            return takeScreencap({
              ...m,
              movie,
            });
          }),
      );

      return 'SUCCESS';
    } catch (e) {
      log.error(e);
      return 'ERROR';
    }
  },
);

export const enqueueScreencaps = createTask;
export const runEnqueueScreencapsTask = runTask;
export const enqueueScreencapsDefinitionOptions = taskDefinitionOptions;
