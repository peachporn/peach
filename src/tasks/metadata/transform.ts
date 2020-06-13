import child_process from 'child_process';
import { MovieMetadataCreateInput } from '@prisma/client';
import { isFormatSupported, MovieFormat, MovieQuality } from '../../domain/movie';
import { FFProbeMetadata, FFProbeStream, log } from './types';

const findVideoStream = (metadata: FFProbeMetadata) =>
  metadata.streams.find(s => s.codec_type === 'video');

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

const fps = (stream: FFProbeStream): number =>
  Math.round(parseInt(stream.r_frame_rate.split('/')[0] || '0', 10) / 1000);

export const transformMovieMetadata = (
  metadata: FFProbeMetadata,
): Omit<MovieMetadataCreateInput, 'movie'> => {
  const videoStream = findVideoStream(metadata);

  if (!videoStream) {
    log.error('No video stream found!');
    throw new Error('Missing video stream');
  }

  return {
    quality: quality(videoStream),
    format: format(metadata),
    fps: fps(videoStream),
    durationSeconds: Math.floor(parseFloat(metadata.format.duration)),
    sizeInKB: Math.floor(metadata.format.size / 1000),
  };
};
