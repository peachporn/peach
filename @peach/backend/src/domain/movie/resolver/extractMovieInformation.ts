import { aperture, head, range, toLower, toUpper, uniq } from 'ramda';
import { nonNullish, prisma } from '@peach/utils';
import { spaceCase, pascalCase } from 'case-anything';
import { Actress, Website } from '@peach/types';
import { Resolvers } from '../../../generated/resolver-types';
import { transformBaseWebsite } from '../../website/transformer/baseWebsite';
import { transformActress } from '../../actress/transformer/actress';

export const isUppercase = (c: string) => toUpper(c) === c;

const isAllNumbers = (s: string) => /^\d+$/.test(s);
const isAllSameCharacter = (s: unknown[]) => uniq(s).length === 1;

const isRestrictedWord = (s: string) => ['the', 'mp4', 'xxx'].includes(toLower(s));
const isAllConsonants = (s: string) =>
  s.split('').filter(x => ['a', 'e', 'i', 'o', 'u', 'y'].includes(x)).length === 0;

const tokenize = (movieFileName: string) => movieFileName.split(/[\W-_]/);

const nameCandidates = (tokens: string[]) =>
  range(1, 5)
    .map(n =>
      aperture(
        n,
        nonNullish(
          tokens.flatMap(s => {
            if (!s) return null;
            const spaceCased = spaceCase(s);
            const separated = spaceCased.split(' ');
            const camelCased = pascalCase(s);
            return uniq([...separated, spaceCased, camelCased]);
          }),
        )
          .filter(s => !isAllConsonants(s))
          .filter(s => !isAllNumbers(s))
          .filter(s => !isAllSameCharacter(s.split('')))
          .filter(s => !isRestrictedWord(s)),
      ),
    )
    .map(xs => xs.map(x => x.join(' ')))
    .flat();

export const extractMovieInformationResolvers: Resolvers = {
  Mutation: {
    extractMovieInformation: async (_parent, { movieTitle }) => {
      const tokens = tokenize(movieTitle).filter(t => t !== '');
      const candidates = nameCandidates(tokens);

      const detections = nonNullish(
        await Promise.all(
          candidates.map(c =>
            Promise.all([
              prisma.actress.findUnique({ where: { name: c } }),
              prisma.website.findUnique({ where: { name: c } }),
            ]).then(([foundActress, foundWebsite]) =>
              foundActress
                ? ({
                    tokens: tokenize(c),
                    type: 'Actress',
                    content: transformActress(foundActress),
                  } as const)
                : foundWebsite
                ? ({
                    tokens: tokenize(c),
                    type: 'Website',
                    content: transformBaseWebsite(foundWebsite),
                  } as const)
                : null,
            ),
          ),
        ),
      ).map((detection, i) => ({
        id: i + 1,
        ...detection,
      }));

      return {
        tokens: tokens.map(token => ({
          token,
          detection: detections.find(d => d.tokens.includes(token))?.id || undefined,
        })),
        detections: detections.map(d =>
          d.type === 'Actress'
            ? {
                __typename: 'ActressDetection',
                id: d.id,
                content: d.content as Actress,
              }
            : {
                __typename: 'WebsiteDetection',
                id: d.id,
                content: d.content as Website,
              },
        ),
      };
    },
  },
};
