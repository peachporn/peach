import { Eyecolor, Haircolor, UpdateActressInput } from '@peach/types';
import { nonNullish } from '@peach/utils/src/list';
import { ActressFormValues } from '../types/actressFormValues';
import { isCupsize, isGenderExpression } from '../types/appearance';

export const actressFormValuesToUpdateInput = (
  formData: ActressFormValues,
): UpdateActressInput => ({
  name: formData.name,
  aliases: formData.aliases.split(','),

  genderExpression: isGenderExpression(formData.genderExpression)
    ? formData.genderExpression
    : 'Androgynous',
  haircolor: (formData.haircolor as Haircolor) || undefined,
  eyecolor: (formData.eyecolor as Eyecolor) || undefined,
  equipment: nonNullish([
    formData.cupsize && isCupsize(formData.cupsize)
      ? {
          type: 'Tits',
          size: formData.cupsize,
          hasImplants: formData.hasImplants === 'true' ?? false,
        }
      : undefined,
    formData.hasDick ? { type: 'Dick' } : undefined,
    formData.hasPussy ? { type: 'Pussy' } : undefined,
  ]),
  height: formData.height ? parseInt(formData.height, 10) : undefined,
  weight: formData.weight ? parseInt(formData.weight, 10) : undefined,
  measurements: [
    formData.measurements.chest,
    formData.measurements.waist,
    formData.measurements.hips,
  ].every(m => m)
    ? {
        chest: parseInt(formData.measurements.chest, 10),
        waist: parseInt(formData.measurements.waist, 10),
        hips: parseInt(formData.measurements.hips, 10),
      }
    : undefined,

  piercings: formData.piercings || undefined,
  tattoos: formData.tattoos || undefined,

  dateOfBirth: formData.dateOfBirth || undefined,
  dateOfCareerstart: formData.dateOfCareerstart || undefined,
  dateOfRetirement: formData.dateOfRetirement || undefined,
  dateOfDeath: formData.dateOfDeath || undefined,

  city: formData.city || undefined,
  province: formData.province || undefined,
  country: formData.country || undefined,

  officialWebsite: formData.officialWebsite || undefined,
  socialMediaLinks: formData.socialMediaLinks.split('\n'),
});
