import which from 'which';
import { logScope } from '../utils';

const log = logScope('check-prerequisites');

const hasFFMPEGInstalled = () =>
  which('ffmpeg')
    .catch(() => {
      log.error('No ffmpeg executable found in PATH! Please make sure you have ffmpeg installed.');
      throw new Error('Missing FFMPEG Executable');
    })
    .then(() => which('ffprobe'))
    .catch(() => {
      log.error('No ffprobe executable found in PATH! Please make sure you have ffmpeg installed.');
      throw new Error('Missing ffprobe Executable');
    })
    .then(() => true);

export const arePrerequisitesMet = (): Promise<boolean> =>
  Promise.all([hasFFMPEGInstalled()]).then(prerequisites => !prerequisites.some(x => !x));
