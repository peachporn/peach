import { logScope } from '@peach/utils/src/logging';
import { sequence } from '@peach/utils/src/promise';
import { markTask, runningTasks } from './status';
import { toTask } from './type';

const log = logScope('run-tasks');

export const cleanupRunningTasks = () => {
  log.debug('Cleaning up running tasks...');
  return runningTasks()
    .then(tasks => tasks.map(toTask))
    .then(tasks => sequence(tasks.map(t => () => markTask('ERROR', t, 'SERVER_RESTARTED'))));
};
