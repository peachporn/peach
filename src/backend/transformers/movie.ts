import { MovieGetPayload, MovieMetadata } from '@prisma/client';

const qualityMap: { [key: string]: Quality } = {
  SD: 'SD',
  HD: 'HD',
  FULLHD: 'FullHD',
  UHD: 'UHD',
};

const formatMap: { [key: string]: Format } = {
  MP4: 'MP4',
  WMV: 'WMV',
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
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  actors: movie.actors,
  screencaps: [],
  coverIndex: movie.cover,
  fresh: true,
});
