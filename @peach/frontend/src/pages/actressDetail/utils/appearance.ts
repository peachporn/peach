import { ActressDetailFragment } from '@peach/types';
import {
  isAndrogynous,
  isDick,
  isFemale,
  isMale,
  isPussy,
  isTits,
} from '../../../domain/actress/types/appearance';

export const tits = (actress: ActressDetailFragment) => actress.appearance?.equipment.find(isTits);
export const dick = (actress: ActressDetailFragment) => actress.appearance?.equipment.find(isDick);
export const pussy = (actress: ActressDetailFragment) =>
  actress.appearance?.equipment.find(isPussy);

export const looksMale = (actress: ActressDetailFragment) =>
  actress.appearance?.genderExpression && isMale(actress.appearance.genderExpression);

export const looksFemale = (actress: ActressDetailFragment) =>
  actress.appearance?.genderExpression && isFemale(actress.appearance.genderExpression);

export const looksAndrogynous = (actress: ActressDetailFragment) =>
  actress.appearance?.genderExpression && isAndrogynous(actress.appearance.genderExpression);
