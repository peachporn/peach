import { promises } from 'fs';

const { unlink } = promises;

export const deleteIfExists = (moviePath: string) =>
  unlink(moviePath).catch((e: NodeJS.ErrnoException) => {
    if (e.code === 'ENOENT') return;
    throw e;
  });
