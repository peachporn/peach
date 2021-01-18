import { ActressUpdateInput } from '@prisma/client';
import { logScope, prisma } from '@peach/utils';
import { FreeonesScraper, ScrapedActress, scrape } from '@peach/scrapers';
import { defineTask } from '../task/template';
import { postProcessActress } from './post-process';

const log = logScope('scrape-actress');

type ScrapeActressParams = {
  id: number;
  name: string;
};

const toDBActress = (actress: ScrapedActress): Omit<ActressUpdateInput, 'movies'> => {
  const { id, picture, ...rest } = actress;
  return {
    ...rest,
    aliases: actress.aliases ? JSON.stringify(actress.aliases) : undefined,
    measurements: actress.measurements ? JSON.stringify(actress.measurements) : undefined,
    socialMediaLinks: actress.socialMediaLinks
      ? JSON.stringify(actress.socialMediaLinks)
      : undefined,
  };
};

const { createTask, runTask, taskDefinitionOptions } = defineTask<ScrapeActressParams>(
  'SCRAPE_ACTRESS',
  async ({ parameters: { id, name } }) => {
    try {
      const actress = await scrape(FreeonesScraper)(name);
      const processedActress = await postProcessActress(id, actress);

      await prisma.actress.update({
        where: {
          id,
        },
        data: toDBActress(processedActress),
      });

      return 'SUCCESS';
    } catch (e) {
      log.error(e);
      return 'ERROR';
    }
  },
);

export const scrapeActress = createTask;
export const runScrapeActressTask = runTask;
export const scrapeActressDefinitionOptions = taskDefinitionOptions;
