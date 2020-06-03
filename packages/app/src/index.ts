import { startServer } from './express';
import { startTaskWorkers } from './cron';
import { arePrerequisitesMet } from './prerequisites';

arePrerequisitesMet().then(() => {
  startTaskWorkers();
  startServer();
});
