import { SettingsCreateInput } from '@prisma/client';
import { prisma } from '../../prisma';

export const defaultSettings: SettingsCreateInput = {
  language: 'EN',
  screencapPath: '',
  inferMovieTitle: 'FILENAME',
};

const settings = () => prisma.settings.findOne({ where: { id: 1 } });

export const getInferMovieTitle = () =>
  settings().then(s => (s && s.inferMovieTitle) || ('FILENAME' as InferMovieTitle));

export const getScreencapPath = () => settings().then(s => s && s.screencapPath);
