import { Task, TaskResult, toTask } from './type';
import { taskRunners } from './runners';
import { logScope } from '../../utils';
import { markTask, pendingTasks, removeTask } from './status';

const log = logScope('run-tasks');

const runTask = async (task: Task): Promise<void> => {
  const run = taskRunners.get(task.category);

  if (!run) {
    log.warn(`No task runner found for type ${task.category}!`);
    return;
  }

  await markTask('RUNNING', task);

  const result = await run(task).catch(async error => {
    log.error(error);
    await markTask('ERROR', task, error.toString());
    return 'ERROR' as TaskResult;
  });

  if (result === 'ERROR') {
    return;
  }

  if (result === 'SKIPPED' || result === 'RETRY') {
    await markTask('PENDING', task);
  }

  if (result === 'SUCCESS') {
    await removeTask(task);
  }
};

export const runTasks = async () => {
  const tasks = await pendingTasks();

  if (!tasks.length) {
    return Promise.resolve();
  }

  return runTask(toTask(tasks[0]));
};
