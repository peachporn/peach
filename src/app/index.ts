import { startServer } from './express';
import { startTaskWorkers } from './cron';
import { arePrerequisitesMet } from './prerequisites';
import { prisma } from '../prisma';

arePrerequisitesMet().then(() => {
  startTaskWorkers();
  startServer();
});

prisma.movie.findMany().then(console.log);
