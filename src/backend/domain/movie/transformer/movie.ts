import { Prisma } from '@prisma/client';
import { fromDBActress } from '../../../../domain/actress/db';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { transformMetadata } from './metadata';

type MovieWithOptionalMetadataAndVolume = Omit<
  Prisma.MovieGetPayload<{
    include: { metadata: true; volume: true; actresses: true; fetishes: true };
  }>,
  'metadata' | 'volume' | 'actresses' | 'fetishes'
> &
  Partial<
    Pick<
      Prisma.MovieGetPayload<{
        include: { metadata: true; volume: true; actresses: true; fetishes: true };
      }>,
      'metadata' | 'volume' | 'actresses' | 'fetishes'
    >
  >;

export const transformMovie = (movie: MovieWithOptionalMetadataAndVolume): Movie => ({
  id: movie.id,
  url: '',
  createdAt: movie.createdAt.toString(),
  title: movie.title,

  actresses: (movie.actresses || []).map(fromDBActress),
  actors: movie.actors,

  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  volume: movie.volume,
  path: movie.path,

  screencaps: [],
  cover: movie.cover,

  genres: [],
  fetishes: (movie.fetishes || []).map(transformBaseGenre),
});
