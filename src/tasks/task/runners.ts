import { TaskCategory, TaskRunner } from './type';
import { runScanLibraryTask } from '../library';
import { runScrapeMetadataTask } from '../metadata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const taskRunners: Map<TaskCategory, TaskRunner<any>> = new Map();

taskRunners.set('SCAN_LIBRARY', runScanLibraryTask);
taskRunners.set('SCRAPE_METADATA', runScrapeMetadataTask);
