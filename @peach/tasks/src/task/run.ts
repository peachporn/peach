import { logScope } from '@peach/utils/src/logging';
import { taskDefinitionOptions, taskRunners } from './runners';
import { markTask, pendingTasks, removeTask, runningTasks } from './status';
import { Task, TaskCategory, TaskResult, toTask } from './type';

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
  const running = await runningTasks();

  if (!tasks.length) {
    return Promise.resolve();
  }

  const runnableTasks = tasks.filter(task => {
    const options = taskDefinitionOptions.get(task.category as TaskCategory);
    if (!options || !options.workers) {
      return true;
    }
    const runningOfCategory = running.filter(t => t.category === task.category);
    return runningOfCategory.length < options.workers;
  });

  if (!runnableTasks.length) {
    return Promise.resolve();
  }

  return runTask(toTask(runnableTasks[0]));
};
