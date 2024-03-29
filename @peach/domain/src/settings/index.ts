import { InferMovieTitle } from '@peach/types';
import { fromEnvOptional } from '@peach/utils/src/env';
import { Prisma, prisma } from '@peach/utils/src/prisma';

export const defaultSettings: Prisma.SettingsCreateInput = {
  language: 'EN',
  libraryPath: fromEnvOptional('DEFAULT_LIBRARY_PATH') || '',
  inferMovieTitle: 'FILENAME',
};

const settings = () => prisma.settings.findMany().then(s => (s.length ? s[0] : undefined));

export const getInferMovieTitle = () =>
  settings().then(s => (s && s.inferMovieTitle) || ('FILENAME' as InferMovieTitle));

export const getScreencapPath = () => settings().then(s => s && `${s.libraryPath}/screencaps/`);

export const getActressImagePath = () => settings().then(s => s && `${s.libraryPath}/actresses/`);

export const getWebsiteImagePath = () => settings().then(s => s && `${s.libraryPath}/websites/`);

export const getGenreImagePath = () => settings().then(s => s && `${s.libraryPath}/genres/`);
