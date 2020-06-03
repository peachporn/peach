import which from 'which';
import { logScope } from '@peach/utils';

const log = logScope('check-prerequisites');

const hasFFMPEGInstalled = () =>
  which('ffmpeg')
    .then(() => true)
    .catch(() => {
      log.error('No ffmpeg executable found in PATH! Please make sure you have ffmpeg installed.');
      throw new Error('Missing FFMPEG Executable');
    });

export const arePrerequisitesMet = (): Promise<boolean> =>
  Promise.all([hasFFMPEGInstalled()]).then(prerequisites => !prerequisites.some(x => x === false));
