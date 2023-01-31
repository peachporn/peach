import { InferMovieTitle, Language, Settings } from '@peach/types';
import { Prisma } from '@peach/utils/src/prisma';
import { transformBaseGenre } from '../../genre/transformer/genre';

const languageMap: { [key: string]: Language } = {
  EN: 'EN',
};

const inferMovieTitleMap: { [key: string]: InferMovieTitle } = {
  FOLDER: 'FOLDER',
  FILENAME: 'FILENAME',
};

export const transformSettings = (
  settings: Partial<Prisma.SettingsGetPayload<{ include: { pinnedFetishes: true } }>>,
): Settings => ({
  id: settings.id || 0,
  language: (settings.language && languageMap[settings.language]) || 'EN',
  inferMovieTitle:
    (settings.inferMovieTitle && inferMovieTitleMap[settings.inferMovieTitle]) || 'FILENAME',
  libraryPath: settings.libraryPath || undefined,
  pinnedFetishes: (settings.pinnedFetishes || []).map(transformBaseGenre),
  autoConvertMovies: settings.autoConvertMovies ?? true,
  volumes: [],
});
