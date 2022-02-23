import { Cupsize, Eyecolor, GenderExpression, Haircolor } from '@peach/types';

export const cupsizes: Cupsize[] = [
  'AA',
  'A',
  'B',
  'C',
  'D',
  'DD',
  'DDD',
  'E',
  'F',
  'FF',
  'G',
  'H',
  'I',
  'J',
  'K',
];
export const isCupsize = (s: string): s is Cupsize => cupsizes.includes(s as Cupsize);

export const eyecolors: Eyecolor[] = ['Green', 'Blue', 'Brown', 'Hazel', 'Grey', 'Other'];
export const isEyecolor = (s: string): s is Eyecolor => eyecolors.includes(s as Eyecolor);

export const haircolors: Haircolor[] = ['Blonde', 'Brunette', 'Black', 'Red', 'Auburn', 'Other'];
export const isHaircolor = (s: string): s is Haircolor => haircolors.includes(s as Haircolor);

export const genderExpressions: GenderExpression[] = ['Androgynous', 'Male', 'Female'];
export const isGenderExpression = (s: string): s is GenderExpression =>
  genderExpressions.includes(s as GenderExpression);
