import { logScope, spawnP } from '@peach/utils';
import { defineTask } from '../task/template';
import { ScreencapMovie } from './type';
import { screencapCommand } from './screencap';

const log = logScope('screencaps');

export type TakeScreencapParams = {
  movie: ScreencapMovie;
  filename: string;
  index: number;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<TakeScreencapParams>(
  'TAKE_SCREENCAP',
  async ({ parameters: { movie, filename } }) => {
    const command = screencapCommand(filename, movie);
    log.debug(`Running command ${command}`);

    await spawnP(command, log, true);

    return 'SUCCESS';
  },
  {
    workers: 1,
  },
);

export const takeScreencap = createTask;
export const runTakeScreencapTask = runTask;
export const takeScreencapDefinitionOptions = taskDefinitionOptions;
