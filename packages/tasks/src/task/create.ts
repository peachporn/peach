import { Task as DBTask } from '@peach/database';
import { prisma } from '../prisma';
import { TaskDefinition } from './type';

export const createTask = (task: TaskDefinition): Promise<DBTask> =>
  prisma.task.create({
    data: {
      ...task,
      status: 'PENDING',
    },
  });

export const createUniqueTask = (task: TaskDefinition): Promise<DBTask> =>
  prisma.task
    .findMany({
      where: {
        category: task.category,
      },
    })
    .then(existingTasks => (existingTasks.length > 0 ? existingTasks[0] : null))
    .then(existingTask => existingTask || createTask(task));
