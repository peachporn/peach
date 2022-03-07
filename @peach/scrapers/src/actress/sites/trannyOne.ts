import { isEyecolor, isHaircolor } from '@peach/domain';
import { Eyecolor, Haircolor } from '@peach/types';
import slugify from 'slugify';
import { filter, regex } from '../transformers';
import { ActressScraper } from '../type';

export const TrannyOneScraper: ActressScraper = {
  overview: {
    nameToUrl: name => `https://www.tranny.one/search/${slugify(name).replace(/-/g, '+')}`,
    readySelector: '#pornoStarSearchContainer [itemprop="name"]',
    itemSelector: '#pornoStarSearchContainer',
    fields: {
      name: {
        selector: '[itemprop="name"]',
        type: 'element',
        transform: e => e.text().trim(),
      },
      pictureUrl: {
        selector: '[itemprop="image"]',
        type: 'element',
        transform: e => e.attr('src'),
      },
      detailUrl: {
        selector: '#pornoStarSearchContainer > div > a',
        type: 'element',
        transform: e => e.attr('href'),
      },
    },
  },
  detail: {
    detailUrlMatches: url => url.includes('tranny.one'),
    fields: {
      name: {
        type: 'element',
        selector: '[itemprop="name"]',
        transform: e => e.text(),
      },
      dateOfBirth: {
        type: 'element',
        selector: '[itemprop="birthDate"]',
        transform: e => {
          try {
            return new Date(e.first().text()).toISOString();
          } catch (_e) {
            return undefined;
          }
        },
      },
      height: {
        type: 'element',
        selector: '[itemprop="height"]',
        transform: e => regex(/(\d*) cm/, x => parseInt(x, 10))(e.text()),
      },
      weight: {
        selector: '[itemprop="weight"]',
        type: 'element',
        transform: e => regex(/(\d*) kg/, x => parseInt(x, 10))(e.text()),
      },
      hasDick: {
        type: 'constant',
        value: true,
      },
      hasPussy: {
        type: 'constant',
        value: false,
      },
      genderExpression: {
        type: 'constant',
        value: 'Female',
      },

      haircolor: {
        type: 'element',
        selector: 'b:contains("Hair color:")',
        transform: e => {
          const haircolor = e.next().text().trim();
          return filter<Haircolor>(isHaircolor)(haircolor === 'Blond' ? 'Blonde' : haircolor);
        },
      },

      eyecolor: {
        type: 'element',
        selector: 'b:contains("Eye color:")',
        transform: e => {
          const eyecolor = e.next().text().trim();
          return filter<Eyecolor>(isEyecolor)(eyecolor);
        },
      },

      country: {
        selector: '.moveBlock li b:contains("Country")',
        type: 'element',
        transform: e => e.next().text().trim(),
      },
      province: {
        selector: '.moveBlock li b:contains("State")',
        type: 'element',
        transform: e => e.next().text().trim(),
      },
      city: {
        selector: '.moveBlock li b:contains("Town")',
        type: 'element',
        transform: e => e.next().text().trim(),
      },
      socialMediaLinks: {
        selector: 'b:contains("My Social Profiles")',
        type: 'element',
        transform: e => {
          const html = e.parent().html();
          if (!html) return undefined;
          const matches = html.match(/ href="(.*?)"/g);
          return !matches
            ? undefined
            : matches.filter(Boolean).map(m => m.replace(/"/g, '').replace(' href=', ''));
        },
      },
      picture: {
        selector: '[itemprop="image"]',
        type: 'element',
        transform: e => e.attr('src'),
      },
    },
  },
};
