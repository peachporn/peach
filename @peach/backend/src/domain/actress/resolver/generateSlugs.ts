import { fromDBActress } from '@peach/domain';
import { prisma } from '@peach/utils/src/prisma';
import { Resolvers } from '../../../generated/resolver-types';
import { slugifyActressName } from './createActress';

export const generateSlugsResolver: Resolvers = {
  Mutation: {
    generateSlugs: () =>
      prisma.actress
        .findMany({ where: { slug: '' } })
        .then(actresses => {
          Promise.all(
            actresses.map(fromDBActress).map(a =>
              prisma.actress.update({
                where: { id: a.id },
                data: { slug: slugifyActressName(a.name, a.aliases) },
              }),
            ),
          );
        })
        .then(() => true)
        .catch(() => false),
  },
};
