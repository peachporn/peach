import { convertMovieDefinitionOptions, runConvertMovieTask } from '../convertMovie';
import { runScanLibraryTask, scanLibraryDefinitionOptions } from '../library';
import { runScrapeMetadataTask, scrapeMetadataDefinitionOptions } from '../metadata';
import { runTakeScreencapTask, takeScreencapDefinitionOptions } from '../screencaps';
import { TaskCategory, TaskDefinitionOptions, TaskRunner } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const taskRunners: Map<TaskCategory, TaskRunner<any>> = new Map();

taskRunners.set('SCAN_LIBRARY', runScanLibraryTask);
taskRunners.set('SCRAPE_METADATA', runScrapeMetadataTask);
taskRunners.set('TAKE_SCREENCAP', runTakeScreencapTask);
taskRunners.set('CONVERT_MOVIE', runConvertMovieTask);

export const taskDefinitionOptions: Map<TaskCategory, TaskDefinitionOptions> = new Map();

taskDefinitionOptions.set('SCAN_LIBRARY', scanLibraryDefinitionOptions);
taskDefinitionOptions.set('SCRAPE_METADATA', scrapeMetadataDefinitionOptions);
taskDefinitionOptions.set('TAKE_SCREENCAP', takeScreencapDefinitionOptions);
taskDefinitionOptions.set('CONVERT_MOVIE', convertMovieDefinitionOptions);
