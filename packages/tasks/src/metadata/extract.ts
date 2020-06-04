import child_process from 'child_process';
import * as path from 'path';
import { promisify } from 'util';
import { MovieGetPayload } from '../../../database/generated';
import {
  FFProbeFormat,
  FFProbeMetadata,
  FFProbeStream,
  formatEntries,
  streamEntries,
} from './types';

const exec = promisify(child_process.exec);

const toCLIOptions = (entries: (keyof FFProbeFormat | keyof FFProbeStream)[]): string =>
  entries.join(',');

export const extractMovieMetadata = (
  movie: MovieGetPayload<{ include: { volume: true } }>,
): Promise<FFProbeMetadata> =>
  new Promise((resolve, reject) => {
    const moviePath = path.join(movie.volume.path, movie.path);
    const command = [
      'ffprobe',
      '-of json',
      '-v error',
      '-select_streams v:0',
      `-show_entries format=${toCLIOptions(formatEntries)}`,
      `-show_entries stream=${toCLIOptions(streamEntries)}`,
      `"${moviePath}"`,
    ].join(' ');

    exec(command).then(({ stdout, stderr }) => {
      if (stderr) {
        return reject(stderr);
      }
      return resolve(JSON.parse(stdout));
    });
  });
