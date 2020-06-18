import { TaskCategory, TaskRunner } from './type';
import { runScanLibraryTask } from '../library';
import { runScrapeMetadataTask } from '../metadata';
import { runTakeScreencapTask } from '../screencaps';
import { runScrapeActressTask } from '../actress-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const taskRunners: Map<TaskCategory, TaskRunner<any>> = new Map();

taskRunners.set('SCAN_LIBRARY', runScanLibraryTask);
taskRunners.set('SCRAPE_METADATA', runScrapeMetadataTask);
taskRunners.set('TAKE_SCREENCAPS', runTakeScreencapTask);
taskRunners.set('SCRAPE_ACTRESS', runScrapeActressTask);
