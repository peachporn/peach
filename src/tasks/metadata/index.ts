import { defineTask } from '../task/template';
import { scrapeMovieMetadata } from './scrape';
import { ScrapeableMovie } from './types';

type ScrapeMetadataParameters = {
  movie: ScrapeableMovie;
};

const { createTask, runTask } = defineTask<ScrapeMetadataParameters>(
  'SCRAPE_METADATA',
  async ({ parameters: { movie } }) => scrapeMovieMetadata(movie),
  {
    workers: 1,
  },
);

export const scrapeMetadata = createTask;
export const runScrapeMetadataTask = runTask;
