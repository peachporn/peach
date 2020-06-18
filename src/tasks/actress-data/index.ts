import { ActressUpdateInput } from '@prisma/client';
import { logScope } from '../../utils';
import { defineTask } from '../task/template';
import { FreeonesScraper } from '../../scrapers/actress/sites/freeones';
import { scrape } from '../../scrapers/actress/scrape';
import { prisma } from '../../prisma';
import { ScrapedActress } from '../../scrapers/actress/type';
import { geocodeLocation } from '../../utils/location';

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

const postProcessActress = async (actress: ScrapedActress) => {
  const location = await geocodeLocation(actress.country, actress.province, actress.city);
  return {
    ...actress,
    ...(!location
      ? {}
      : {
          longitude: location.longitude,
          latitude: location.latitude,
        }),
  };
};

const { createTask, runTask } = defineTask<ScrapeActressParams>(
  'SCRAPE_ACTRESS',
  async ({ parameters: { id, name } }) => {
    try {
      const actress = await scrape(FreeonesScraper)(name);
      const processedActress = await postProcessActress(actress);

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
