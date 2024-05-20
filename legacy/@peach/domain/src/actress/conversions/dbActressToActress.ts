import { Actress } from '@peach/types';
import { nonNullish } from '@peach/utils/src/list';
import { Actress as DBActress } from '@prisma/client';
import { isCupsize, isEyecolor, isGenderExpression, isHaircolor } from '../fixtures';

export const fromDBActress = (actress: DBActress): Omit<Actress, 'movies'> => {
  const measurements = JSON.parse(actress.measurements);

  return {
    id: actress.id,
    name: actress.name,
    aliases: JSON.parse(actress.aliases),

    appearance: {
      genderExpression:
        actress.genderExpression && isGenderExpression(actress.genderExpression)
          ? actress.genderExpression
          : 'Androgynous',
      piercings: actress.piercings ?? undefined,
      measurements:
        measurements.chest && measurements.hips && measurements.waist ? measurements : null,
      tattoos: actress.tattoos || undefined,
      haircolor:
        actress.haircolor && isHaircolor(actress.haircolor) ? actress.haircolor : undefined,
      eyecolor: actress.eyecolor && isEyecolor(actress.eyecolor) ? actress.eyecolor : undefined,
      height: actress.height || undefined,
      weight: actress.weight || undefined,
      equipment: nonNullish([
        actress.dick ? { __typename: 'Dick' } : undefined,
        actress.pussy ? { __typename: 'Pussy' } : undefined,
        actress.cupsize && isCupsize(actress.cupsize)
          ? { __typename: 'Tits', size: actress.cupsize, hasImplants: actress.boobs === 'Fake' }
          : undefined,
      ]),
    },

    dates: {
      dateOfBirth: actress.dateOfBirth ? actress.dateOfBirth.toISOString() : undefined,
      dateOfCareerstart: actress.dateOfCareerstart
        ? actress.dateOfCareerstart.toISOString()
        : undefined,
      dateOfDeath: actress.dateOfDeath ? actress.dateOfDeath.toISOString() : undefined,
      dateOfRetirement: actress.dateOfRetirement
        ? actress.dateOfRetirement.toISOString()
        : undefined,
    },

    contact: {
      socialMediaLinks: actress.socialMediaLinks ? JSON.parse(actress.socialMediaLinks) : undefined,
      officialWebsite: actress.officialWebsite || undefined,
    },

    location: {
      country: actress.country || undefined,
      province: actress.province || undefined,
      city: actress.city || undefined,
      location:
        !actress.latitude || !actress.longitude
          ? undefined
          : {
              longitude: actress.longitude,
              latitude: actress.latitude,
            },
    },
  };
};
