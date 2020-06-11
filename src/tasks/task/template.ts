import { Task, TaskCategory, TaskResult, TaskRunner } from './type';
import { createTask, createUniqueTask } from './create';
import { prisma } from '../../prisma';
import { logScope } from '../../utils/logging';

const log = logScope('run-tasks');

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
    runTask: async (task: Task<TaskParameters>): Promise<TaskResult> => {
      if (!isRunnerResponsible(task)) {
        return 'SKIPPED';
      }

      const runningOfCategory = await runningTasksOfCategory(category);
      if (runningOfCategory > (options.workers || defaultOptions.workers)) {
        log.debug(
          `Skipping ${category} task run, as there are ${runningOfCategory - 1} already running...`,
        );
        return 'RETRY';
      }

      log.info(`Running task ${JSON.stringify(task)}`);

      return runner(task);
    },
  };
};
