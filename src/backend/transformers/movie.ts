import { MovieGetPayload, MovieMetadata } from '@prisma/client';

const qualityMap: { [key: string]: Quality } = {
  SD: 'SD',
  HD: 'HD',
  FullHD: 'FullHD',
  UHD: 'UHD',
};

const formatMap: { [key: string]: Format } = {
  mp4: 'mp4',
  wmv: 'wmv',
};

type MovieWithOptionalMetadataAndVolume = Omit<
  MovieGetPayload<{
    include: { metadata: true; volume: true };
  }>,
  'metadata' | 'volume'
> &
  Partial<
    Pick<MovieGetPayload<{ include: { metadata: true; volume: true } }>, 'metadata' | 'volume'>
  >;

const transformMetadata = (metadata: MovieMetadata): Movie['metaData'] =>
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

export const transformMovie = (movie: MovieWithOptionalMetadataAndVolume): Movie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  actors: movie.actors,
  volume: movie.volume,
  screencaps: [],
  coverIndex: movie.cover,
  path: movie.path,
  fresh: true,
});
