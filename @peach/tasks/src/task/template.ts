import { logScope } from '@peach/utils';
import { Task, TaskCategory, TaskResult, TaskRunner, TaskDefinitionOptions } from './type';
import { createTask, createUniqueTask } from './create';
import { numberOfRunningTasksOfCategory } from './status';

const log = logScope('run-tasks');

const defaultOptions = {
  unique: false,
  workers: Infinity,
};

export const defineTask = <TaskParameters = {}>(
  category: TaskCategory,
  runner: TaskRunner<TaskParameters>,
  options: TaskDefinitionOptions = defaultOptions,
) => {
  const isRunnerResponsible = (task: Task<TaskParameters>) => task.category === category;

  const create = options.unique ? createUniqueTask : createTask;

  return {
    taskDefinitionOptions: options,
    createTask: (parameters: TaskParameters) => create<TaskParameters>({ category, parameters }),
    runTask: async (task: Task<TaskParameters>): Promise<TaskResult> => {
      if (!isRunnerResponsible(task)) {
        return 'SKIPPED';
      }

      const runningOfCategory = await numberOfRunningTasksOfCategory(category);
      if (runningOfCategory > (options.workers || defaultOptions.workers)) {
        return 'RETRY';
      }

      log.info(`Running task ${JSON.stringify(task)}`);

      return runner(task);
    },
  };
};
