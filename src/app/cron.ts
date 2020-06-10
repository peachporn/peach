import { CronJob } from 'cron';
import { runTasks } from '../tasks';

export const startTaskWorkers = () => {
  const job = new CronJob('*/10 * * * * *', runTasks);

  job.start();
};
