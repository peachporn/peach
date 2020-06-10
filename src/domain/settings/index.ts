import { SettingsCreateInput } from '@prisma/client';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  screencapPath: '',
  inferMovieTitle: 'FILENAME',
};
