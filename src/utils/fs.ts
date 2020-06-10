import { promises } from 'fs';

const { stat } = promises;

export const exists = (path: string) =>
  stat(path)
    .then(() => true)
    .catch(() => false);
