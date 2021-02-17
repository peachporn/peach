import { TaskCreateInput, Task as PrismaTask } from '@prisma/client';

export type DBTask = PrismaTask;

export const toDBTask = (task: Task): DBTask => ({
  ...task,
  parameters: JSON.stringify(task.parameters),
});

export const toTask = (task: DBTask): Task => ({
  ...task,
  status: task.status as TaskStatus,
  category: task.category as TaskCategory,
  parameters: task.parameters ? JSON.parse(task.parameters) : {},
});
export type TaskStatusMessage = 'SERVER_RESTARTED';

export type TaskCategory =
  | 'SCAN_LIBRARY'
  | 'SCRAPE_METADATA'
  | 'ENQUEUE_SCREENCAPS'
  | 'TAKE_SCREENCAP';
export type TaskStatus = 'PENDING' | 'RUNNING' | 'ERROR';

export type TaskDefinition<Parameters = {}> = Omit<
  TaskCreateInput,
  'category' | 'status' | 'parameters'
> & {
  category: TaskCategory;
  parameters: Parameters;
};

export type Task<Parameters = {}> = Omit<DBTask, 'category' | 'status' | 'parameters'> & {
  category: TaskCategory;
  status: TaskStatus;
  parameters: Parameters;
};

export type TaskResult = 'SKIPPED' | 'RETRY' | 'SUCCESS' | 'ERROR';

export type TaskRunner<TaskParameters = {}> = (task: Task<TaskParameters>) => Promise<TaskResult>;

export type TaskDefinitionOptions = {
  unique?: boolean;
  workers?: number;
};
