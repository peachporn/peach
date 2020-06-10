import { MovieGetPayload } from '@prisma/client';
import { logScope } from '../../utils';

export const log = logScope('scrape-metadata');

export type ScrapeableMovie = MovieGetPayload<{
  select: {
    path: true;
  };
  include: {
    volume: true;
  };
}>;

export const streamEntries: (keyof FFProbeStream)[] = ['codec_type', 'height', 'r_frame_rate'];
export type FFProbeStream = {
  codec_type: string;
  height: string;
  r_frame_rate: string;
};

export const formatEntries: (keyof FFProbeFormat)[] = ['size', 'duration', 'filename'];
export type FFProbeFormat = {
  size: number;
  duration: string;
  filename: string;
};

export type FFProbeMetadata = {
  format: FFProbeFormat;
  streams: FFProbeStream[];
};
