import { Actress as DBActress } from '@prisma/client';
import { Actress } from '@peach/types';
import { isBoobs, isCupsize, isEthnicity, isEyecolor, isHaircolor } from './fixtures';

export const fromDBActress = (actress: DBActress): Omit<Actress, 'movies'> => {
  const measurements = JSON.parse(actress.measurements);
  return {
    ...actress,
    aliases: actress.aliases ? JSON.parse(actress.aliases) : [],
    piercings: actress.piercings || undefined,
    measurements:
      measurements.bust && measurements.hips && measurements.waist ? measurements : null,
    tattoos: actress.tattoos || undefined,
    haircolor: actress.haircolor && isHaircolor(actress.haircolor) ? actress.haircolor : undefined,
    eyecolor: actress.eyecolor && isEyecolor(actress.eyecolor) ? actress.eyecolor : undefined,
    ethnicity: actress.ethnicity && isEthnicity(actress.ethnicity) ? actress.ethnicity : undefined,
    dateOfBirth: actress.dateOfBirth ? actress.dateOfBirth.toISOString() : undefined,
    dateOfCareerstart: actress.dateOfCareerstart
      ? actress.dateOfCareerstart.toISOString()
      : undefined,
    dateOfDeath: actress.dateOfDeath ? actress.dateOfDeath.toISOString() : undefined,
    dateOfRetirement: actress.dateOfRetirement ? actress.dateOfRetirement.toISOString() : undefined,
    country: actress.country || undefined,
    province: actress.province || undefined,
    city: actress.city || undefined,
    boobs: actress.boobs && isBoobs(actress.boobs) ? actress.boobs : undefined,
    height: actress.height || undefined,
    weight: actress.weight || undefined,
    cupsize: actress.cupsize && isCupsize(actress.cupsize) ? actress.cupsize : undefined,
    socialMediaLinks: actress.socialMediaLinks ? JSON.parse(actress.socialMediaLinks) : undefined,
    officialWebsite: actress.officialWebsite || undefined,
    location:
      !actress.latitude || !actress.longitude
        ? undefined
        : {
            longitude: actress.longitude,
            latitude: actress.latitude,
          },
  };
};
