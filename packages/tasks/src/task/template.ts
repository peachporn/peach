import { Task, TaskCategory, TaskRunner } from './type';
import { createTask, createUniqueTask } from './create';

type TaskDefinitionOptions = {
  unique?: boolean;
};

const defaultOptions = {
  unique: false,
};

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

      return runner(task);
    },
  };
};
