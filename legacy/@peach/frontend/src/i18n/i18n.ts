import en from './translations/en';

export type I18nKey = keyof typeof en;

export const i = (key: I18nKey, params: { [key: string]: string } = {}) => {
  const i18nString = en[key];

  if (!i18nString) {
    return key;
  }

  const replacements = i18nString.match(/{{.*?}}/g);

  if (!replacements) {
    return i18nString;
  }

  return replacements.reduce(
    (acc, cur) => acc.replace(cur, params[cur.replace(/[${}]/g, '')] || cur),
    i18nString,
  );
};
