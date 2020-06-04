import { logScope } from '@peach/utils';
import { prisma } from '../prisma';
import { defineTask } from '../task/template';
import { scanVolume } from './scan';
import { scrapeMetadata } from '../metadata';

const log = logScope('scan-library');

const scanVolumes = () =>
  prisma.volume.findMany().then(volumes => Promise.all(volumes.map(scanVolume)));

const scrapeMetadataForMissingMovies = () =>
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

const { createTask, runTask } = defineTask(
  'SCAN_LIBRARY',
  async () => {
    await scanVolumes();
    log.debug('Done scanning volumes');
    await scrapeMetadataForMissingMovies();
  },
  {
    unique: true,
  },
);

export const scanLibrary = createTask;
export const runScanLibraryTask = runTask;
