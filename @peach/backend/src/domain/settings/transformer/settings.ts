import { Prisma } from '@peach/utils';
import { InferMovieTitle, Language, Settings } from '@peach/types';
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
  screencapPath: settings.screencapPath || undefined,
  actressImagePath: settings.actressImagePath || undefined,
  genreImagePath: settings.genreImagePath || undefined,
  pinnedFetishes: (settings.pinnedFetishes || []).map(transformBaseGenre),
  volumes: [],
});
