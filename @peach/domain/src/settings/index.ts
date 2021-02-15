import { SettingsCreateInput } from '@prisma/client';
import { InferMovieTitle } from '@peach/types';
import { prisma } from '@peach/utils';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  libraryPath: '',
  inferMovieTitle: 'FILENAME',
};

const settings = () => prisma.settings.findUnique({ where: { id: 1 } });

export const getInferMovieTitle = () =>
  settings().then(s => (s && s.inferMovieTitle) || ('FILENAME' as InferMovieTitle));

export const getScreencapPath = () => settings().then(s => s && `${s.libraryPath}/screencaps/`);

export const getActressImagePath = () => settings().then(s => s && `${s.libraryPath}/actresses/`);

export const getWebsitesImagePath = () => settings().then(s => s && `${s.libraryPath}/websites/`);

export const getGenreImagePath = () => settings().then(s => s && `${s.libraryPath}/genres/`);
