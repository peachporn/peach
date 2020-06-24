import en from './translations/en';

export type I18nKey = keyof typeof en;
export const i = (key: I18nKey) => en[key] || key;
