import en from './translations/en';

export const i = (key: keyof typeof en) => en[key] || key;
