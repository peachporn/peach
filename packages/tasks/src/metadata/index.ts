import { defineTask } from '../task/template';
import { MovieGetPayload } from '../../../database/generated';

type ScrapeMetadataParameters = {
  movie: MovieGetPayload<{
    select: {
      path: true;
    };
  }>;
};

const { createTask, runTask } = defineTask<ScrapeMetadataParameters>(
  'SCRAPE_METADATA',
  async ({ parameters: { movie } }) => {
    console.log(movie);
  },
);

export const scrapeMetadata = createTask;
export const runScrapeMetadataTask = runTask;
