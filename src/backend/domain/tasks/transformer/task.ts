import { Task as DBTask } from '@prisma/client';

const statusMap: { [key: string]: TaskStatus } = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  ERROR: 'ERROR',
};

export const transformTask = (task: DBTask): Task => ({
  id: task.id,
  category: task.category,
  parameters: task.parameters || undefined,
  status: statusMap[task.status],
  statusMessage: task.statusMessage || undefined,
});
