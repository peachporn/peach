import child_process from 'child_process';
import { isFormatSupported, MovieFormat, MovieQuality } from '@peach/domain';
import { MovieMetadataCreateInput } from '../../../database/generated';
import { FFProbeMetadata, FFProbeStream, log } from './types';

const findVideoStream = (metadata: FFProbeMetadata) =>
  metadata.streams.find(s => s.codec_type === 'video');

const minutesAndSeconds = (duration: number): [number, number] => [
  Math.floor(duration / 60),
  Math.floor(duration % 60),
];
const quality = (stream: FFProbeStream): MovieQuality => {
  const height = parseInt(stream.height, 10);
  return height < 700 ? 'SD' : height < 1000 ? 'HD' : height < 1800 ? 'FullHD' : 'UHD';
};
const format = (metadata: FFProbeMetadata): MovieFormat => {
  const filenameParts = metadata.format.filename.split('.');
  if (!filenameParts.length) {
    log.error(`Couldn't extract movie format from filename ${metadata.format.filename}`);
    throw new Error('Error reading format');
  }

  const extension = filenameParts[filenameParts.length - 1];

  if (!isFormatSupported(extension)) {
    log.error(`Unknown movie extension ${extension}`);
    throw new Error('Error reading format');
  }

  return extension;
};

export const transformMovieMetadata = (
  metadata: FFProbeMetadata,
): Omit<MovieMetadataCreateInput, 'movie'> => {
  const videoStream = findVideoStream(metadata);

  if (!videoStream) {
    log.error('No video stream found!');
    throw new Error('Missing video stream');
  }

  const [minutes, seconds] = minutesAndSeconds(metadata.format.duration);

  return {
    quality: quality(videoStream),
    format: format(metadata),
    fps: Math.round(
      videoStream.avg_frame_rate
        .split('/')
        .map(i => parseInt(i, 10))
        .reduce((pre, cur) => pre / cur),
    ),
    minutes,
    seconds,
    size: Math.floor(metadata.format.size / 1000 / 1000),
  };
};
