import { ActressDates } from '@peach/types';

export const isInBusiness = (actress: Pick<ActressDates, 'dateOfDeath' | 'dateOfRetirement'>) =>
  !actress?.dateOfDeath && !actress.dateOfRetirement;
