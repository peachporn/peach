import { defineTask } from '../task/template';
import { hasMissingScreencaps } from './util';
import { logScope } from '../../utils';
import { ScreencapMovie } from './type';
import { spawnP } from '../../utils/exec';
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

    await spawnP(command, log);

    return 'SUCCESS';
  },
  {
    workers: 1,
  },
);

export const takeScreencap = createTask;
export const runTakeScreencapTask = runTask;
export const takeScreencapDefinitionOptions = taskDefinitionOptions;
