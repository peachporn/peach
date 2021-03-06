import { ActressCreateInput } from '@peach/utils';
import { CreateActressInput } from '@peach/types';
import { transformActress } from '../transformer/actress';
import { Resolvers } from '../../../generated/resolver-types';

const toDBActress = (actress: CreateActressInput): Omit<ActressCreateInput, 'movies'> => ({
  ...actress,
  aliases: actress.aliases ? JSON.stringify(actress.aliases) : undefined,
  measurements: actress.measurements ? JSON.stringify(actress.measurements) : undefined,
  dateOfBirth: actress.dateOfBirth ? new Date(actress.dateOfBirth) : undefined,
  dateOfCareerstart: actress.dateOfCareerstart ? new Date(actress.dateOfCareerstart) : undefined,
  dateOfRetirement: actress.dateOfRetirement ? new Date(actress.dateOfRetirement) : undefined,
  dateOfDeath: actress.dateOfDeath ? new Date(actress.dateOfDeath) : undefined,
  socialMediaLinks: actress.socialMediaLinks ? JSON.stringify(actress.socialMediaLinks) : undefined,
});

export const createActressResolvers: Resolvers = {
  Mutation: {
    createActress: async (_parent, { input }, { prisma }) => {
      const actress = await prisma.actress.create({
        data: toDBActress(input),
      });

      return transformActress(actress);
    },
  },
};
