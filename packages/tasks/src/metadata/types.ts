import { logScope } from '@peach/utils';
import { MovieGetPayload } from '../../../database/generated';

export const log = logScope('scrape-metadata');

export type ScrapeableMovie = MovieGetPayload<{
  select: {
    path: true;
  };
  include: {
    volume: true;
  };
}>;

export type FFProbeStream = {
  codec_type: string;
  height: string;
  avg_frame_rate: string;
};

export type FFProbeMetadata = {
  format: {
    size: number;
    duration: number;
    filename: string;
  };
  streams: FFProbeStream[];
};
