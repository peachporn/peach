import { CronJob } from 'cron';
import { runTasks } from '@peach/tasks';

export const startTaskWorkers = () => {
  const job = new CronJob('*/10 * * * * *', runTasks);

  job.start();
};
