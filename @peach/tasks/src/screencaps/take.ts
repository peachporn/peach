import ffmpeg from 'fluent-ffmpeg';
import { fullPath, movieScreencapPath } from '@peach/domain';
import { defineTask } from '../task/template';
import { ScreencapMovie } from './type';

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
    const ffmpegProcess = ffmpeg(fullPath(movie))
      .on('end', () => {
        resolve('SUCCESS' as const);
      })
      .on('error', error => {
        reject(error);
      })
      .screenshots({
        timestamps: [timestamp],
        filename: `${movie.id}-0${i}.jpg`,
        folder: screencapPath,
      });
    setTimeout(() => {
      ffmpegProcess.kill('SIGKILL');
      reject(new Error('Timed out'));
    }, 60000);
  });

const { createTask, runTask, taskDefinitionOptions } = defineTask<TakeScreencaps>(
  'TAKE_SCREENCAP',
  ({ parameters: { movie } }) =>
    movieScreencapPath(movie).then(screencapPath =>
      Promise.all(
        ['15%', '30%', '50%', '70%', '85%'].map((timestamp, i) =>
          ffmpegScreencap(movie, screencapPath, timestamp, i + 1),
        ),
      )
        .then(() => 'SUCCESS' as const)
        .catch(() => 'ERROR' as const),
    ),
  {
    workers: 1,
  },
);

export const takeScreencap = createTask;
export const runTakeScreencapTask = runTask;
export const takeScreencapDefinitionOptions = taskDefinitionOptions;
