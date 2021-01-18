import { SettingsCreateInput } from '@prisma/client';
import { InferMovieTitle } from '@peach/types';
import { prisma } from '@peach/utils';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  screencapPath: '',
  actressImagePath: '',
  genreImagePath: '',
  inferMovieTitle: 'FILENAME',
};

const settings = () => prisma.settings.findUnique({ where: { id: 1 } });

export const getInferMovieTitle = () =>
  settings().then(s => (s && s.inferMovieTitle) || ('FILENAME' as InferMovieTitle));

export const getScreencapPath = () => settings().then(s => s && s.screencapPath);

export const getActressImagePath = () => settings().then(s => s && s.actressImagePath);

export const getGenreImagePath = () => settings().then(s => s && s.genreImagePath);
