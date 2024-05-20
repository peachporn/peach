import { CreateActressInput, Cupsize } from '@peach/types';
import { prisma } from '@peach/utils/src/prisma';
import { isEyecolor, isGenderExpression, isHaircolor } from '../fixtures';
import { slugifyActressName } from './slugifyName';

type CreateActressArgs = Parameters<typeof prisma.actress.create>[0]['data'];
export const toDBActress = (input: CreateActressInput): CreateActressArgs => {
  const tits = input.equipment?.find(e => e && e.type === 'Tits');
  const dick = input.equipment?.find(e => e && e.type === 'Dick');
  const pussy = input.equipment?.find(e => e && e.type === 'Pussy');

  return {
    name: input.name,
    slug: slugifyActressName(input.name),
    aliases: JSON.stringify(input.aliases),

    boobs: tits === undefined ? null : tits.hasImplants ? 'Fake' : 'Natural',
    cupsize: tits === undefined ? null : (tits.size as Cupsize),
    dick: dick !== undefined,
    pussy: pussy !== undefined,
    haircolor: input.haircolor && isHaircolor(input.haircolor) ? input.haircolor : undefined,
    eyecolor: input.eyecolor && isEyecolor(input.eyecolor) ? input.eyecolor : undefined,
    genderExpression:
      input.genderExpression && isGenderExpression(input.genderExpression)
        ? input.genderExpression
        : 'Androgynous',
    height: input.height || undefined,
    weight: input.weight || undefined,
    measurements:
      input.measurements?.chest && input.measurements?.hips && input.measurements?.waist
        ? JSON.stringify(input.measurements)
        : undefined,
    piercings: input.piercings ?? undefined,
    tattoos: input.tattoos || undefined,

    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth).toISOString() : undefined,
    dateOfCareerstart: input.dateOfCareerstart
      ? new Date(input.dateOfCareerstart).toISOString()
      : undefined,
    dateOfDeath: input.dateOfDeath ? new Date(input.dateOfDeath).toISOString() : undefined,
    dateOfRetirement: input.dateOfRetirement
      ? new Date(input.dateOfRetirement).toISOString()
      : undefined,

    socialMediaLinks: input.socialMediaLinks ? JSON.stringify(input.socialMediaLinks) : undefined,
    officialWebsite: input.officialWebsite,

    country: input.country,
    province: input.province,
    city: input.city,
  };
};
