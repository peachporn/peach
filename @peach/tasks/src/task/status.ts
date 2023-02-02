import { retryWithFalloff } from '@peach/utils/src/falloff';
import { prisma } from '@peach/utils/src/prisma';
import { omit } from 'ramda';
import { DBTask, Task, TaskCategory, TaskStatus, toDBTask } from './type';

export const runningTasks = (): Promise<DBTask[]> =>
  prisma.task.findMany({
    where: {
      status: 'RUNNING',
    },
  });

export const pendingTasks = (): Promise<DBTask[]> =>
  prisma.task.findMany({
    where: {
      status: 'PENDING',
    },
  });

export const markTask = (status: TaskStatus, task: Task, message?: string) =>
  prisma.task.update({
    where: {
      id: task.id,
    },
    data: omit(['id'], {
      ...toDBTask(task),
      status,
      ...(!message
        ? {}
        : {
            statusMessage: message,
          }),
    }),
  });

const retry = retryWithFalloff(
  5,
  error => error.toString().includes('Timed out during query execution'),
  100,
  ms => ms * 2,
);

export const removeTask = (task: Task) =>
  retry(() =>
    prisma.task.delete({
      where: {
        id: task.id,
      },
    }),
  );

export const tasksByCategoryAndStatus = (category: TaskCategory, statuses: TaskStatus[]) =>
  prisma.task.findMany({
    where: {
      OR: statuses.map(status => ({ status })),
      category,
    },
  });

export const runningTasksOfCategory = (category: TaskCategory) =>
  tasksByCategoryAndStatus(category, ['RUNNING']);

export const numberOfRunningTasksOfCategory = (category: TaskCategory): Promise<number> =>
  runningTasksOfCategory(category).then(data => data.length);
