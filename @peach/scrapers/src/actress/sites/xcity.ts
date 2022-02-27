import { isCupsize } from '@peach/domain';
import { nonNullish } from '@peach/utils/src/list';
import { regex } from '../transformers';
import { ActressScraper } from '../type';

export const XcityScraper: ActressScraper = {
  overview: {
    nameToUrl: name =>
      `https://xxx.xcity.jp/idol/?genre=%2Fidol%2F&q=${name.replace(/ -/g, '+')}&sg=idol&num=30`,
    readySelector: '#avidol',
    itemSelector: '#avidol .itemBox',
    fields: {
      name: {
        selector: '.name a',
        type: 'element',
        transform: e => e.text().trim().replace(/\s+/g, ' '),
      },
      pictureUrl: {
        selector: '.actressThumb',
        type: 'element',
        transform: e => e.attr('src'),
      },
      detailUrl: {
        selector: '.name a',
        type: 'element',
        transform: e => `https://xxx.xcity.jp/idol/${e.attr('href')}`,
      },
    },
  },
  detail: {
    fields: {
      name: {
        type: 'element',
        selector: 'h1',
        transform: e =>
          e
            .text()
            .replace(/\[.*]/g, '')
            .replace(/Originaltext/g, ''),
      },
      aliases: {
        type: 'element',
        selector: 'h1',
        transform: e => nonNullish([e.text().replace(/^.*\[(.*)]/g, '$1')]),
      },
      dateOfBirth: {
        type: 'element',
        selector: '.profile dd:contains("Date of birth")',
        transform: e => {
          try {
            return new Date(
              e
                .first()
                .text()
                .replace(/Date of birth/g, ''),
            ).toISOString();
          } catch (_e) {
            return undefined;
          }
        },
      },
      height: {
        type: 'element',
        selector: '.profile dd:contains("Height")',
        transform: e => regex(/(\d*) cm/, x => parseInt(x, 10))(e.text()),
      },
      hasDick: {
        type: 'constant',
        value: false,
      },
      hasPussy: {
        type: 'constant',
        value: true,
      },
      measurements: {
        selector: '.profile dd:contains("Size")',
        type: 'element',
        transform: e => {
          const matches = /B(\d{2,3}).*W(\d{2,3}).*H(\d{2,3})/.exec(
            e.text().replace(/[\s\n]/gm, ''),
          );
          const parse = (s: string | undefined) => (s ? parseInt(s, 10) : 0);
          if (!matches) {
            return undefined;
          }

          return {
            chest: parse(matches[1] || undefined),
            waist: parse(matches[2] || undefined),
            hips: parse(matches[3] || undefined),
          };
        },
      },
      cupsize: {
        selector: '.profile dd:contains("Size")',
        type: 'element',
        transform: e => {
          const matches = /B\d*\((.*)\)/.exec(e.text());
          if (!matches) {
            return undefined;
          }
          if (isCupsize(matches[1])) return matches[1];
        },
      },
      genderExpression: {
        type: 'constant',
        value: 'Female',
      },

      country: {
        type: 'constant',
        value: 'Japan',
      },
      city: {
        selector: '.profile dd:contains("City of Born")',
        type: 'element',
        transform: e =>
          e
            .first()
            .text()
            .replace(/City of Born/g, '')
            .trim(),
      },
      picture: {
        selector: '.photo img',
        type: 'element',
        transform: e => e.attr('src'),
      },
    },
  },
};
