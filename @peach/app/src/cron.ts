import { CronJob } from 'cron';
import { runTasks } from '@peach/tasks';

export const startTaskWorkers = () => {
  const job = new CronJob('* * * * * *', runTasks);

  job.start();
};
