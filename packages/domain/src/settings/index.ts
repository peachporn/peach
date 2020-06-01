import { SettingsCreateInput } from '@peach/database';

export type InferMovieTitle = 'FILENAME' | 'FOLDER';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  inferMovieTitle: 'FILENAME'
}

