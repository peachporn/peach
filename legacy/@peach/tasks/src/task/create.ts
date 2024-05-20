import { prisma } from '@peach/utils/src/prisma';
import { Task as DBTask } from '@prisma/client';
import { TaskDefinition } from './type';

export const createTask = async <TaskParameters = {}>(
  task: TaskDefinition<TaskParameters>,
): Promise<DBTask> =>
  prisma.task.create({
    data: {
      ...task,
      status: 'PENDING',
      parameters: JSON.stringify(task.parameters),
    },
  });

export const createUniqueTask = <TaskParameters = {}>(
  task: TaskDefinition<TaskParameters>,
): Promise<DBTask> =>
  prisma.task
    .findMany({
      where: {
        category: task.category,
      },
    })
    .then(existingTasks => (existingTasks.length > 0 ? existingTasks[0] : null))
    .then(existingTask => existingTask || createTask(task));
