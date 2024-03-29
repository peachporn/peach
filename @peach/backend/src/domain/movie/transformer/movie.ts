import { fromDBActress } from '@peach/domain';
import { Movie } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';
import { transformBaseGenre } from '../../genre/transformer/genre';
import { transformBaseWebsite } from '../../website/transformer/baseWebsite';
import { transformMetadata } from './metadata';

type MovieWithOptionalMetadataAndVolume = Omit<
  Prisma.MovieGetPayload<{
    include: { metadata: true; volume: true; actresses: true; fetishes: true; website: true };
  }>,
  'metadata' | 'volume' | 'actresses' | 'fetishes' | 'website'
> &
  Partial<
    Pick<
      Prisma.MovieGetPayload<{
        include: { metadata: true; volume: true; actresses: true; fetishes: true; website: true };
      }>,
      'metadata' | 'volume' | 'actresses' | 'fetishes' | 'website'
    >
  >;

export const transformMovie = (movie: MovieWithOptionalMetadataAndVolume): Movie => ({
  id: movie.id,
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  videoUrl: '',

  actresses: (movie.actresses || []).map(fromDBActress),
  website: movie.website ? transformBaseWebsite(movie.website) : undefined,

  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  volume: movie.volume,
  path: movie.path,

  screencaps: [],
  cover: movie.cover,

  genres: [],
  fetishes: (movie.fetishes || []).map(transformBaseGenre),

  untouched: true,
});
