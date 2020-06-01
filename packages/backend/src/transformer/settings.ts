import { Settings as DBSettings } from '@peach/database';
import { InferMovieTitle, Language, Settings } from '../generated/types';

const languageMap: { [key: string]: Language } = {
  EN: Language.En,
};

const inferMovieTitleMap: { [key: string]: InferMovieTitle } = {
  FOLDER: InferMovieTitle.Folder,
  FILENAME: InferMovieTitle.Filename,
};
export const transformSettings = (settings: DBSettings): Settings => ({
  language: languageMap[settings.language] || Language.En,
  inferMovieTitle: inferMovieTitleMap[settings.inferMovieTitle] || InferMovieTitle.Filename,
  volumes: [],
});
