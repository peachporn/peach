import { MovieGetPayload, MovieMetadata } from '@prisma/client';
import { fromDBActress } from '../../domain/actress/db';
import { transformBaseGenre } from './genre';

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
  'metadata' | 'volume' | 'actresses'
> &
  Partial<
    Pick<
      MovieGetPayload<{ include: { metadata: true; volume: true; actresses: true } }>,
      'metadata' | 'volume' | 'actresses'
    >
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

export const transformMovieListMovie = (
  movie: MovieGetPayload<{ include: { genres: true } }>,
): MovieListMovie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  screencaps: [],
  coverIndex: movie.cover,
  fresh: movie.genres.length > 0,
});

export const transformMovie = (movie: MovieWithOptionalMetadataAndVolume): Movie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  actresses: (movie.actresses || []).map(fromDBActress),
  actors: movie.actors,
  volume: movie.volume,
  screencaps: [],
  genres: [],
  fetishes: (movie.fetishes || []).map(transformBaseGenre),
  coverIndex: movie.cover,
  path: movie.path,
  fresh: true,
});
