import { markTask, runningTasks } from './status';
import { sequence } from '../../utils/promise';
import { toTask } from './type';
import { logScope } from '../../utils/logging';

const log = logScope('run-tasks');

export const cleanupRunningTasks = () => {
  log.debug('Cleaning up running tasks...');
  return runningTasks()
    .then(tasks => tasks.map(toTask))
    .then(tasks => sequence(tasks.map(t => () => markTask('ERROR', t, 'SERVER_RESTARTED'))));
};
