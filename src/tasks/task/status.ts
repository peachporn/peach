import { DBTask, Task, TaskStatus, toDBTask } from './type';
import { prisma } from '../../prisma';

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
    data: {
      ...toDBTask(task),
      status,
      ...(!message
        ? {}
        : {
            statusMessage: message,
          }),
    },
  });

export const removeTask = (task: Task) =>
  prisma.task.delete({
    where: {
      id: task.id,
    },
  });
