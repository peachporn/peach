import { ActressCreateInput } from '@peach/utils';
import { CreateActressInput } from '@peach/types';
import { transformActress } from '../transformer/actress';
import { Resolvers } from '../../../generated/resolver-types';

export const slugifyActressName = (name: string, aliases?: string[]): string =>
  `${name.replace(/\W/g, '').toLowerCase()}${
    !aliases?.filter(a => a !== '').length
      ? ''
      : `-${aliases.map(a => slugifyActressName(a)).join('-')}`
  }`;

const toDBActress = (actress: CreateActressInput): Omit<ActressCreateInput, 'movies'> => ({
  ...actress,
  aliases: actress.aliases ? JSON.stringify(actress.aliases) : undefined,
  slug: slugifyActressName(actress.name, actress.aliases),
  measurements: actress.measurements ? JSON.stringify(actress.measurements) : undefined,
  dateOfBirth: actress.dateOfBirth ? new Date(actress.dateOfBirth) : undefined,
  dateOfCareerstart: actress.dateOfCareerstart ? new Date(actress.dateOfCareerstart) : undefined,
  dateOfRetirement: actress.dateOfRetirement ? new Date(actress.dateOfRetirement) : undefined,
  dateOfDeath: actress.dateOfDeath ? new Date(actress.dateOfDeath) : undefined,
  socialMediaLinks: actress.socialMediaLinks ? JSON.stringify(actress.socialMediaLinks) : undefined,
});

export const createActressResolvers: Resolvers = {
  Mutation: {
    createActress: async (_parent, { input }, { prisma }) =>
      prisma.actress
        .create({
          data: toDBActress(input),
        })
        .then(transformActress),
  },
};
