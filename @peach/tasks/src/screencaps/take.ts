import { logScope } from '@peach/utils';
import ffmpeg from 'fluent-ffmpeg';
import { fullPath, movieScreencapPath } from '@peach/domain';
import { defineTask } from '../task/template';
import { ScreencapMovie } from './type';

const log = logScope('screencaps');

export type TakeScreencaps = {
  movie: ScreencapMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<TakeScreencaps>(
  'TAKE_SCREENCAP',
  ({ parameters: { movie } }) =>
    movieScreencapPath(movie).then(
      screencapPath =>
        new Promise(resolve => {
          ffmpeg(fullPath(movie))
            .on('end', () => {
              resolve('SUCCESS' as const);
            })
            .screenshots({
              count: 5,
              filename: `${movie.id}-%0i.jpg`,
              folder: screencapPath,
            });
        }),
    ),
  {
    workers: 1,
  },
);

export const takeScreencap = createTask;
export const runTakeScreencapTask = runTask;
export const takeScreencapDefinitionOptions = taskDefinitionOptions;
