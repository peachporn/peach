import {
  Cupsize,
  Dick,
  Equipment,
  Eyecolor,
  GenderExpression,
  Haircolor,
  Pussy,
  Tits,
} from '@peach/types';

export const isTits = (equipment: Equipment): equipment is Tits => equipment.__typename === 'Tits';
export const isDick = (equipment: Equipment): equipment is Dick => equipment.__typename === 'Dick';
export const isPussy = (equipment: Equipment): equipment is Pussy =>
  equipment.__typename === 'Pussy';

export const isMale = (expression: GenderExpression): expression is 'Male' => expression === 'Male';
export const isFemale = (expression: GenderExpression): expression is 'Female' =>
  expression === 'Female';
export const isAndrogynous = (expression: GenderExpression): expression is 'Androgynous' =>
  expression === 'Androgynous';

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
