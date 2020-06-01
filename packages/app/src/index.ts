import { startServer } from './express';
import { startTaskWorkers } from './cron';

startTaskWorkers();
startServer();
