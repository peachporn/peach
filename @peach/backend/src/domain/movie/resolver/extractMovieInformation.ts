import { aperture, head, range, toLower, toUpper, uniq } from 'ramda';
import { nonNullish, prisma } from '@peach/utils';
import { spaceCase, pascalCase } from 'case-anything';
import { Resolvers } from '../../../generated/resolver-types';
import { transformBaseWebsite } from '../../website/transformer/baseWebsite';
import { transformActress } from '../../actress/transformer/actress';

export const isUppercase = (c: string) => toUpper(c) === c;

const isAllNumbers = (s: string) => /^\d+$/.test(s);
const isAllSameCharacter = (s: unknown[]) => uniq(s).length === 1;

const isRestrictedWord = (s: string) => ['the', 'mp4', 'xxx'].includes(toLower(s));
const isAllConsonants = (s: string) =>
  s.split('').filter(x => ['a', 'e', 'i', 'o', 'u', 'y'].includes(x)).length === 0;

const nameParts = (movieFileName: string) =>
  movieFileName
    .split(/[\W-_]/)
    .flatMap(s => {
      const separated = spaceCase(s).split(' ');
      const camelCased = pascalCase(s);
      return uniq([...separated, camelCased]);
    })
    .filter(s => !isAllConsonants(s))
    .filter(s => !isAllNumbers(s))
    .filter(s => !isAllSameCharacter(s.split('')))
    .filter(s => !isRestrictedWord(s));

const nameCandidates = (movieTitle: string) =>
  range(1, 5)
    .map(n => aperture(n, nameParts(movieTitle)))
    .map(xs => xs.map(x => x.join(' ')))
    .flat();

export const extractMovieInformationResolvers: Resolvers = {
  Mutation: {
    extractMovieInformation: async (_parent, { movieTitle }) => {
      const candidates = nameCandidates(movieTitle);

      const found = await Promise.all(
        candidates.map(c =>
          Promise.all([
            prisma.actress.findUnique({ where: { name: c } }),
            prisma.website.findUnique({ where: { name: c } }),
          ]).then(([foundActress, foundWebsite]) => ({
            actresses: nonNullish([foundActress]),
            website: foundWebsite,
          })),
        ),
      ).then(foundRecords =>
        foundRecords.reduce(
          (acc, cur) => ({
            actresses: nonNullish([...acc.actresses, ...cur.actresses]),
            website: acc.website || cur.website,
          }),
          { actresses: [], website: null },
        ),
      );

      return {
        website: found.website ? transformBaseWebsite(found.website) : undefined,
        actresses: found.actresses.map(transformActress),
      };
    },
  },
};
