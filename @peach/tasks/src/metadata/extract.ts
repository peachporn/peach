import * as path from 'path';
import { execP, Prisma } from '@peach/utils';
import {
  FFProbeFormat,
  FFProbeMetadata,
  FFProbeStream,
  formatEntries,
  streamEntries,
} from './types';

const toCLIOptions = (entries: (keyof FFProbeFormat | keyof FFProbeStream)[]): string =>
  entries.join(',');

export const extractMovieMetadata = (
  movie: Prisma.MovieGetPayload<{ include: { volume: true } }>,
): Promise<FFProbeMetadata> => {
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

  return execP(command).then(result => JSON.parse(result) as FFProbeMetadata);
};
