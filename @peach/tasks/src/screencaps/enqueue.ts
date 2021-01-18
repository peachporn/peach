import { logScope } from '@peach/utils';
import { defineTask } from '../task/template';
import { ScreencapMovie } from './type';
import { tasksByCategoryAndStatus } from '../task/status';
import { takeScreencap, TakeScreencapParams } from './take';
import { Task, toTask } from '../task/type';
import { allMissingScreencapDefinitions, criticalScreencapDefinitions } from './definitions';

const log = logScope('screencaps');

type EnqueueScreencapsParams = {
  movie: ScreencapMovie;
  mode: 'allMissing' | 'critical';
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<EnqueueScreencapsParams>(
  'ENQUEUE_SCREENCAPS',
  async ({ parameters: { movie, mode = 'allMissing' } }) => {
    try {
      const runningTakeScreencapTaskIndices = (
        await tasksByCategoryAndStatus('TAKE_SCREENCAP', ['RUNNING', 'ERROR'])
      )
        .map(toTask)
        .map(t => (t as Task<TakeScreencapParams>).parameters.index);

      const definitions = await (mode === 'allMissing'
        ? allMissingScreencapDefinitions(movie)
        : criticalScreencapDefinitions(movie));

      await Promise.all(
        definitions
          .filter(d => !runningTakeScreencapTaskIndices.includes(d.index))
          .map(d => {
            log.debug(`Adding screencapjob: ${JSON.stringify(d)}`);
            return takeScreencap({
              ...d,
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
