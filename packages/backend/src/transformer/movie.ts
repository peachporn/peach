import { MovieGetPayload, MovieMetadata } from '@peach/database';
import { Format, Movie, Quality } from '../generated/types';

const qualityMap: { [key: string]: Quality } = {
  SD: Quality.Sd,
  HD: Quality.Hd,
  FULLHD: Quality.FullHd,
  UHD: Quality.Uhd,
};

const formatMap: { [key: string]: Format } = {
  MP4: Format.Mp4,
  WMV: Format.Wmv,
};

type MovieWithOptionalMetadata = Omit<
  MovieGetPayload<{
    include: { metadata: true };
  }>,
  'metadata'
> &
  Partial<Pick<MovieGetPayload<{ include: { metadata: true } }>, 'metadata'>>;

const transformMetadata = (metadata: MovieMetadata): Movie['metaData'] => ({
  quality: qualityMap[metadata.quality || 'SD'],
  format: formatMap[metadata.format || 'MP4'],
  fps: metadata.fps,
  durationSeconds: metadata.durationSeconds,
  minutes: metadata.durationSeconds / 60,
  seconds: metadata.durationSeconds % 60,
  sizeInKB: metadata.sizeInKB,
  sizeInMB: Math.floor(metadata.sizeInKB / 1000),
});

export const transformMovie = (movie: MovieWithOptionalMetadata): Movie => ({
  id: movie.id,
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  actors: movie.actors,
  screencaps: [],
  coverIndex: movie.cover,
  fresh: true,
});
