import { MovieMetadata, prisma } from '@peach/utils/src/prisma';
import { extractMovieMetadata } from './extract';
import { transformMovieMetadata } from './transform';
import { log, ScrapeableMovie } from './types';

export const scrapeMovieMetadata = (movie: ScrapeableMovie): Promise<MovieMetadata> => {
  log.debug(`Scraping metadata for movie ${movie.title}...`);

  return extractMovieMetadata(movie)
    .then(transformMovieMetadata)
    .then(metadata => {
      log.debug(`Creating metadata object`);
      return prisma.movieMetadata.create({
        data: {
          ...metadata,
          movie: {
            connect: {
              id: movie.id,
            },
          },
        },
      });
    });
};
