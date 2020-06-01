import { Task, TaskRunner } from '../task/type';
import { createUniqueTask } from '../task/create';
import { prisma } from '../prisma';
import { scanVolume } from './scan';

const scanLibraryCategory = 'SCAN_LIBRARY';
const isScanLibraryTask = (task: Task) => task.category === scanLibraryCategory;

export const scanLibrary = () =>
  createUniqueTask({
    category: scanLibraryCategory,
  });

export const runScanLibraryTask: TaskRunner = async task => {
  if (!isScanLibraryTask(task)) {
    return null;
  }

  const volumes = await prisma.volume.findMany();

  return Promise.all(volumes.map(scanVolume));
};
