import { logScope } from '@peach/utils';
import { Task as DBTask } from '@peach/database';
import { prisma } from '../prisma';
import { Task, TaskStatus, toDBTask, toTask } from './type';
import { taskRunners } from './runners';

const log = logScope('run-tasks');

const tasksToRun = (): Promise<DBTask[]> =>
  prisma.task.findMany({
    where: {
      status: 'PENDING',
    },
  });

const markTask = (status: TaskStatus, task: Task) =>
  prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      ...toDBTask(task),
      status,
    },
  });

const removeTask = (task: Task) =>
  prisma.task.delete({
    where: {
      id: task.id,
    },
  });

const runTask = async (task: Task): Promise<void> => {
  const run = taskRunners.get(task.category);

  if (!run) {
    log.warn(`No task runner found for type ${task.category}!`);
    return;
  }

  log.info(`Running task ${JSON.stringify(task)}`);

  await markTask('RUNNING', task);
  await run(task).catch(() => markTask('ERROR', task));
  await removeTask(task);
};

export const runTasks = () => {
  log.debug('Checking for tasks to run...');

  return tasksToRun().then(tasks => tasks.map(toTask).map(runTask));
};
