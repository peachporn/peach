import { Task, TaskCategory, TaskRunner } from './type';
import { createTask, createUniqueTask } from './create';
import { prisma } from '../../prisma';

type TaskDefinitionOptions = {
  unique?: boolean;
  workers?: number;
};

const defaultOptions = {
  unique: false,
  workers: Infinity,
};

const runningTasksOfCategory = (category: TaskCategory): Promise<number> =>
  prisma.task
    .findMany({
      where: {
        status: 'RUNNING',
        category,
      },
    })
    .then(data => data.length);

export const defineTask = <TaskParameters = {}>(
  category: TaskCategory,
  runner: TaskRunner<TaskParameters>,
  options: TaskDefinitionOptions = defaultOptions,
) => {
  const isRunnerResponsible = (task: Task<TaskParameters>) => task.category === category;

  const create = options.unique ? createUniqueTask : createTask;

  return {
    createTask: (parameters: TaskParameters) => create<TaskParameters>({ category, parameters }),
    runTask: async (task: Task<TaskParameters>) => {
      if (!isRunnerResponsible(task)) {
        return null;
      }

      const runningOfCategory = await runningTasksOfCategory(category);
      if (runningOfCategory >= (options.workers || defaultOptions.workers)) {
        return null;
      }

      return runner(task);
    },
  };
};
