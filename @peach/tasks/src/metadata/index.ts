import { defineTask } from '../task/template';
import { scrapeMovieMetadata } from './scrape';
import { ScrapeableMovie } from './types';
import { takeScreencap } from '../screencaps';

type ScrapeMetadataParameters = {
  movie: ScrapeableMovie;
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<ScrapeMetadataParameters>(
  'SCRAPE_METADATA',
  async ({ parameters: { movie } }) =>
    scrapeMovieMetadata(movie)
      .then(metadata => takeScreencap({ movie: { ...movie, metadata } }))
      .then(() => 'SUCCESS'),
  {
    workers: 1,
  },
);

export const scrapeMetadata = createTask;
export const runScrapeMetadataTask = runTask;
export const scrapeMetadataDefinitionOptions = taskDefinitionOptions;
