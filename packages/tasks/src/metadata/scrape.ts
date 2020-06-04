import child_process from 'child_process';
import { Movie } from '../../../database/generated';
import { prisma } from '../prisma';
import { extractMovieMetadata } from './extract';
import { transformMovieMetadata } from './transform';
import { ScrapeableMovie } from './types';

export const scrapeMovieMetadata = (movie: ScrapeableMovie): Promise<Movie> =>
  extractMovieMetadata(movie)
    .then(transformMovieMetadata)
    .then(metadata => {
      const { volume, ...movieWithoutVolume } = movie;

      return prisma.movie.update({
        where: { id: movie.id },
        data: {
          ...movieWithoutVolume,
          metadata: {
            create: {
              ...metadata,
            },
          },
        },
      });
    });
