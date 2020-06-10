import { Settings as DBSettings } from '@prisma/client';

const languageMap: { [key: string]: Language } = {
  EN: 'EN'
};

const inferMovieTitleMap: { [key: string]: InferMovieTitle } = {
  FOLDER: 'FOLDER',
  FILENAME: 'FILENAME',
};
export const transformSettings = (settings: DBSettings): Settings => ({
  language: languageMap[settings.language] || 'EN',
  inferMovieTitle: inferMovieTitleMap[settings.inferMovieTitle] || 'FILENAME',
  volumes: [],
});
