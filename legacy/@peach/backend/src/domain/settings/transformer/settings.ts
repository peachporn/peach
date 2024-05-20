import { InferMovieTitle, Language, Settings } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';

const languageMap: { [key: string]: Language } = {
  EN: 'EN',
};

const inferMovieTitleMap: { [key: string]: InferMovieTitle } = {
  FOLDER: 'FOLDER',
  FILENAME: 'FILENAME',
};

export const transformSettings = (settings: Partial<Prisma.SettingsGetPayload<{}>>): Settings => ({
  id: settings.id || 0,
  language: (settings.language && languageMap[settings.language]) || 'EN',
  inferMovieTitle:
    (settings.inferMovieTitle && inferMovieTitleMap[settings.inferMovieTitle]) || 'FILENAME',
  libraryPath: settings.libraryPath || undefined,
  autoConvertMovies: settings.autoConvertMovies ?? true,
  volumes: [],
});
