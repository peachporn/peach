import { Actress } from '@peach/types';

export const isInBusiness = (actress: Pick<Actress, 'dateOfDeath' | 'dateOfRetirement'>) =>
  !actress.dateOfDeath && !actress.dateOfRetirement;
