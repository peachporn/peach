import path from 'path';
import { promises } from 'fs';
import { prisma } from '@peach/utils';

const { readdir } = promises;

export const NUMBER_OF_SCREENCAPS = 5;
export const DEFAULT_COVER_SCREENCAP_INDEX = 3;

export const movieScreencapPath = async (movie: { id: number }) => {
  const screencapsPath = await prisma.settings
    .findMany()
    .then(settings => (settings.length ? settings[0].screencapPath : null));

  if (!screencapsPath) {
    throw new Error('No screencap path configured!');
  }

  return path.join(screencapsPath, `${movie.id}`);
};

export const movieScreencapsFromFolder = (
  screencapFolder: string,
  fullPath: boolean = false,
): Promise<string[]> =>
  readdir(screencapFolder).then(files =>
    files
      .filter(f => f.endsWith('.jpg'))
      .map(file => (fullPath ? path.join(screencapFolder, file) : file)),
  );

export const movieScreencaps = async (
  movieId: number,
  fullPath: boolean = false,
): Promise<string[]> =>
  movieScreencapPath({ id: movieId }).then(p => movieScreencapsFromFolder(p, fullPath));
