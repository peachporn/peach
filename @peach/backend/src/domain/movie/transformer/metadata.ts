import { Format, Movie, Quality } from '@peach/types';
import { MovieMetadata } from '@peach/utils/src/prisma';

const qualityMap: { [key: string]: Quality } = {
  SD: 'SD',
  HD: 'HD',
  FullHD: 'FullHD',
  UHD: 'UHD',
};

const formatMap: { [key: string]: Format } = {
  mp4: 'mp4',
  wmv: 'wmv',
  mkv: 'mkv',
};

export const transformMetadata = (metadata: MovieMetadata): Movie['metaData'] =>
  !metadata.quality || !metadata.format
    ? undefined
    : {
        quality: qualityMap[metadata.quality || 'SD'],
        format: formatMap[metadata.format || 'MP4'] || 'MP4',
        fps: metadata.fps,
        durationSeconds: metadata.durationSeconds,
        minutes: Math.floor(metadata.durationSeconds / 60),
        seconds: metadata.durationSeconds % 60,
        sizeInKB: metadata.sizeInKB,
        sizeInMB: Math.floor(metadata.sizeInKB / 1000),
      };
