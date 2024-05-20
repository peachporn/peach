import { cleanupRunningTasks } from '@peach/tasks';
import { startServer } from './express';
import { startTaskWorkers } from './cron';
import { arePrerequisitesMet } from './prerequisites';

arePrerequisitesMet().then(async () => {
  startServer();

  await cleanupRunningTasks();
  startTaskWorkers();
});
