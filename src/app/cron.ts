import { CronJob } from 'cron';
import { runTasks } from '../tasks';

export const startTaskWorkers = () => {
  const job = new CronJob('* * * * * *', runTasks);

  job.start();
};
