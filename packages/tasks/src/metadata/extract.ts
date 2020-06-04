import child_process from 'child_process';
import { MovieGetPayload } from '../../../database/generated';
import { FFProbeMetadata, log } from './types';

export const extractMovieMetadata = (
  movie: MovieGetPayload<{ include: { volume: true } }>,
): Promise<FFProbeMetadata> =>
  new Promise((resolve, reject) => {
    const moviePath = `${movie.volume.path}/${movie.path}`;
    const command = 'ffprobe';
    const args = [
      '-print_format',
      'json',
      '-show_format',
      '-show_streams',
      '-v',
      'quiet',
      movie.path,
    ];
    let metadata = '';

    const child = child_process.spawn(command, args);

    child.stdout.on('data', data => {
      metadata += data;
    });

    child.stdout.on('close', () => {
      resolve(JSON.parse(metadata));
    });

    child.stderr.on('data', error => {
      log.error(`Error parsing metadata for movie ${moviePath}`);
      reject(error);
    });
  });
