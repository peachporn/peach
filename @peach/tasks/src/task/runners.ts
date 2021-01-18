import { TaskCategory, TaskDefinitionOptions, TaskRunner } from './type';
import { runScanLibraryTask, scanLibraryDefinitionOptions } from '../library';
import { runScrapeMetadataTask, scrapeMetadataDefinitionOptions } from '../metadata';
import {
  runTakeScreencapTask,
  runEnqueueScreencapsTask,
  enqueueScreencapsDefinitionOptions,
  takeScreencapDefinitionOptions,
} from '../screencaps';
import { runScrapeActressTask, scrapeActressDefinitionOptions } from '../actress-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const taskRunners: Map<TaskCategory, TaskRunner<any>> = new Map();

taskRunners.set('SCAN_LIBRARY', runScanLibraryTask);
taskRunners.set('SCRAPE_METADATA', runScrapeMetadataTask);
taskRunners.set('ENQUEUE_SCREENCAPS', runEnqueueScreencapsTask);
taskRunners.set('TAKE_SCREENCAP', runTakeScreencapTask);
taskRunners.set('SCRAPE_ACTRESS', runScrapeActressTask);

export const taskDefinitionOptions: Map<TaskCategory, TaskDefinitionOptions> = new Map();

taskDefinitionOptions.set('SCAN_LIBRARY', scanLibraryDefinitionOptions);
taskDefinitionOptions.set('SCRAPE_METADATA', scrapeMetadataDefinitionOptions);
taskDefinitionOptions.set('ENQUEUE_SCREENCAPS', enqueueScreencapsDefinitionOptions);
taskDefinitionOptions.set('TAKE_SCREENCAP', takeScreencapDefinitionOptions);
taskDefinitionOptions.set('SCRAPE_ACTRESS', scrapeActressDefinitionOptions);
