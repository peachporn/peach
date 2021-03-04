import { TaskCategory, TaskDefinitionOptions, TaskRunner } from './type';
import { runScanLibraryTask, scanLibraryDefinitionOptions } from '../library';
import { runScrapeMetadataTask, scrapeMetadataDefinitionOptions } from '../metadata';
import { runTakeScreencapTask, takeScreencapDefinitionOptions } from '../screencaps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const taskRunners: Map<TaskCategory, TaskRunner<any>> = new Map();

taskRunners.set('SCAN_LIBRARY', runScanLibraryTask);
taskRunners.set('SCRAPE_METADATA', runScrapeMetadataTask);
taskRunners.set('TAKE_SCREENCAP', runTakeScreencapTask);

export const taskDefinitionOptions: Map<TaskCategory, TaskDefinitionOptions> = new Map();

taskDefinitionOptions.set('SCAN_LIBRARY', scanLibraryDefinitionOptions);
taskDefinitionOptions.set('SCRAPE_METADATA', scrapeMetadataDefinitionOptions);
taskDefinitionOptions.set('TAKE_SCREENCAP', takeScreencapDefinitionOptions);
