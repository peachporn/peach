import { logScope } from '@peach/utils/src/logging';
import { prisma } from '@peach/utils/src/prisma';
import { scrapeMetadata } from '../metadata';

import { defineTask } from '../task/template';
import { scanVolume } from './scan';

const log = logScope('scan-library');

const scanVolumes = () =>
  prisma.volume.findMany().then(volumes => Promise.all(volumes.map(scanVolume)));

const spawnScrapeMetadataTaskForMissingMovies = () =>
  prisma.movie
    .findMany({
      where: {
        metadata: null,
      },
      include: {
        volume: true,
      },
    })
    .then(movies => {
      log.debug(`Found ${movies.length} movies with missing metadata!`);
      return movies.map(movie => scrapeMetadata({ movie }));
    })
    .then(ps => Promise.all(ps));

const { createTask, runTask, taskDefinitionOptions } = defineTask(
  'SCAN_LIBRARY',
  async () => {
    try {
      await scanVolumes();
      await spawnScrapeMetadataTaskForMissingMovies();

      return 'SUCCESS';
    } catch (e) {
      log.error(e);
      return 'ERROR';
    }
  },
  {
    unique: true,
  },
);

export const scanLibrary = createTask;
export const runScanLibraryTask = runTask;
export const scanLibraryDefinitionOptions = taskDefinitionOptions;
