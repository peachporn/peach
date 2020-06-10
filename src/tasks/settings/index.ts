import { InferMovieTitle } from '../../domain';
import { prisma } from '../../prisma';

const settings = () => prisma.settings.findOne({ where: { id: 1 } });

export const inferMovieTitle = () =>
  settings().then(s => (s && s.inferMovieTitle) || ('FILENAME' as InferMovieTitle));
