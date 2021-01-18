import { defineTask } from '../task/template';
import { scrapeMovieMetadata } from './scrape';
import { ScrapeableMovie } from './types';
import { enqueueScreencaps } from '../screencaps';

type ScrapeMetadataParameters = {
  movie: ScrapeableMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<ScrapeMetadataParameters>(
  'SCRAPE_METADATA',
  async ({ parameters: { movie } }) =>
    scrapeMovieMetadata(movie)
      .then(metadata => enqueueScreencaps({ mode: 'critical', movie: { ...movie, metadata } }))
      .then(() => 'SUCCESS'),
  {
    workers: 1,
  },
);

export const scrapeMetadata = createTask;
export const runScrapeMetadataTask = runTask;
export const scrapeMetadataDefinitionOptions = taskDefinitionOptions;
