import { TaskCreateInput, Task as DBTask } from '@peach/database';

export type TaskCategory = 'SCAN_LIBRARY';
export type TaskStatus = 'PENDING' | 'RUNNING' | 'ERROR';

export type TaskDefinition = Omit<TaskCreateInput, 'category' | 'status'> & {
  category: TaskCategory;
};

export type Task = Omit<DBTask, 'category' | 'status'> & {
  category: TaskCategory;
  status: TaskStatus;
};

export type TaskRunner = (task: Task) => Promise<unknown>;
