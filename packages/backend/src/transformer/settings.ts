import { Settings as DBSettings } from '@peach/database';
import { Language, Settings } from '../generated/types';

const languageMap: { [key: string]: Language } = {
  EN: Language.En,
};

export const transformSettings = (settings: DBSettings): Settings => ({
  language: languageMap[settings.language] || Language.En,
});
