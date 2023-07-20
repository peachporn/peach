import { fullPath, movieScreencapPath } from '@peach/domain';
import { logScope } from '@peach/utils/src/logging';
import ffmpeg from 'fluent-ffmpeg';
import mkdirp from 'mkdirp';
import { defineTask } from '../task/template';
import { ScreencapMovie } from './type';

const log = logScope('screencaps');

export type TakeScreencaps = {
  movie: ScreencapMovie;
};

const ffmpegScreencap = (
  movie: ScreencapMovie,
  screencapPath: string,
  timestamp: string,
  i: number,
) =>
  new Promise((resolve, reject) => {
    const ffmpegProcess = ffmpeg(fullPath(movie));

    const timeout = setTimeout(() => {
      log.warn('Screencapping timed out!');
      ffmpegProcess.kill('SIGTERM');
      return reject(new Error('Timed out'));
    }, 30000);

    ffmpegProcess
      .on('end', () => {
        clearTimeout(timeout);
        resolve('SUCCESS' as const);
      })
      .on('error', error => {
        if (error.message.includes('EEXIST')) {
          log.info(`Screencap ${screencapPath} already existed.`);
          clearTimeout(timeout);
          resolve('SUCCESS');
        }
        log.error('Screencapping errored...', error);
        clearTimeout(timeout);
        reject(error);
      })
      .screenshots({
        timestamps: [timestamp],
        filename: `${movie.id}-0${i}.jpg`,
        folder: screencapPath,
      });
  });

const { createTask, runTask, taskDefinitionOptions } = defineTask<TakeScreencaps>(
  'TAKE_SCREENCAP',
  ({ parameters: { movie } }) =>
    movieScreencapPath(movie)
      .then(screencapPath => mkdirp(screencapPath).then(() => screencapPath))
      .then(screencapPath =>
        Promise.all(
          ['15%', '30%', '50%', '70%', '85%'].map((timestamp, i) =>
            ffmpegScreencap(movie, screencapPath, timestamp, i + 1),
          ),
        ).then(() => 'SUCCESS' as const),
      ),
  {
    workers: 1,
  },
);

export const takeScreencap = createTask;
export const runTakeScreencapTask = runTask;
export const takeScreencapDefinitionOptions = taskDefinitionOptions;
