import { NestDataObject } from 'react-hook-form';

export const isTouched = (o: NestDataObject<unknown, true>) =>
  Object.keys(o).length > 0 && Object.values(o).some(x => x !== undefined);
