import { startServer } from './express';
import { startTaskWorkers } from './cron';
import { arePrerequisitesMet } from './prerequisites';
import { cleanupRunningTasks } from '../tasks/task/cleanup';

arePrerequisitesMet().then(async () => {
  startServer();

  await cleanupRunningTasks();
  startTaskWorkers();
});
