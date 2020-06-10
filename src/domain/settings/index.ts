import { SettingsCreateInput } from '@prisma/client';

export type InferMovieTitle = 'FILENAME' | 'FOLDER';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  inferMovieTitle: 'FILENAME',
};
