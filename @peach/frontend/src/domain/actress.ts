import { Boobs, Cupsize, Ethnicity, Eyecolor, Haircolor } from '@peach/types';

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

export const ethnicities: Ethnicity[] = [
  'Caucasian',
  'Asian',
  'Latina',
  'Ebony',
  'NativeAmerican',
  'Indian',
];
export const isEthnicity = (s: string): s is Ethnicity => ethnicities.includes(s as Ethnicity);

export const eyecolors: Eyecolor[] = ['Green', 'Blue', 'Brown', 'Hazel', 'Grey', 'Other'];
export const isEyecolor = (s: string): s is Eyecolor => eyecolors.includes(s as Eyecolor);

export const haircolors: Haircolor[] = ['Blonde', 'Brunette', 'Black', 'Red', 'Auburn', 'Other'];
export const isHaircolor = (s: string): s is Haircolor => haircolors.includes(s as Haircolor);

export const boobs: Boobs[] = ['Natural', 'Fake'];
export const isBoobs = (s: string): s is Boobs => boobs.includes(s as Boobs);
