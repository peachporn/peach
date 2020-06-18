export const isInBusiness = (actress: Pick<Actress, 'dateOfDeath' | 'dateOfRetirement'>) =>
  !actress.dateOfDeath && !actress.dateOfRetirement;
