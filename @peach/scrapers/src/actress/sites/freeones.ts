import { isCupsize, isEyecolor, isHaircolor } from '@peach/domain';
import { Eyecolor, Haircolor } from '@peach/types';
import slugify from 'slugify';
import { filter, regex } from '../transformers';
import { ActressScraper } from '../type';
import { inchToCm } from '../utils/units';

export const FreeonesScraper: ActressScraper = {
  detail: {
    nameToUrl: name => `https://www.freeones.com/${slugify(name)}/bio`,
    detailUrlMatches: url => url.includes('freeones.com'),
    fields: {
      name: {
        selector: 'h1',
        type: 'element',
        transform: e => e.text().replace(/ Bio/, '').trim(),
      },
      aliases: {
        selector: '[data-test="p_aliases"]',
        type: 'element',
        transform: e =>
          e
            .text()
            .split(', ')
            .map(x => x.trim()),
      },
      haircolor: {
        selector: '[data-test="link_span_hair_color"]',
        type: 'element',
        transform: e =>
          e.text() === 'Brown' ? 'Brunette' : filter<Haircolor>(isHaircolor)(e.text().trim()),
      },
      eyecolor: {
        selector: '[data-test="link_span_eye_color"]',
        type: 'element',
        transform: e => filter<Eyecolor>(isEyecolor)(e.text().trim()),
      },
      dateOfBirth: {
        selector: '.profile-meta-item p.mb-1.font-weight-base > a',
        type: 'element',
        transform: e =>
          regex(/(\d{4}-\d{2}-\d{2})/, x => new Date(x).toISOString())(e.attr('href') ?? ''),
      },
      dateOfCareerstart: {
        selector: '.timeline-horizontal > div:first-child > p:first-child',
        type: 'element',
        transform: e => new Date(`${e.text()}-01-01`).toISOString(),
      },
      dateOfRetirement: {
        selector: '.timeline-horizontal > div:first-child > p:last-child',
        type: 'element',
        transform: e =>
          e.text() === 'Now' ? undefined : new Date(`${e.text()}-01-01`).toISOString(),
      },
      dateOfDeath: {
        selector: '.profile-meta-item .hide-on-edit div:nth-child(2)',
        type: 'element',
        transform: e => {
          const matches = e.text().match(/Passed away on (?<date>.*) at/);
          const date = matches && matches.groups && matches.groups.date;
          if (!date) {
            return undefined;
          }
          return new Date(date).toISOString();
        },
      },
      country: {
        selector: '[data-test="link-country"]',
        type: 'element',
        transform: e => regex(/=(.*)$/, x => x)(e.attr('href') ?? ''),
      },
      province: {
        selector: '.profile-meta-item .hide-on-edit p:last-child > a:nth-child(3) > span',
        type: 'element',
        transform: e => e.text(),
      },
      city: {
        selector: '.profile-meta-item .hide-on-edit p:last-child > a:nth-child(2) > span',
        type: 'element',
        transform: e => e.text(),
      },
      hasImplants: {
        selector: '[data-test="link_span_boobs"]',
        type: 'element',
        transform: e => e.text() === 'Fake',
      },
      piercings: {
        selector: '[data-test="p_has_piercings"]',
        type: 'element',
        transform: e => (e.text().trim() === 'Unknown' ? undefined : e.text().trim()),
      },
      tattoos: {
        selector: '[data-test="p_has_tattoos"]',
        type: 'element',
        transform: e => (e.text().trim() === 'Unknown' ? undefined : e.text().trim()),
      },
      height: {
        selector: '[data-test="link_height"]',
        type: 'element',
        transform: e => regex(/(\d*)cm/, x => parseInt(x, 10))(e.text()),
      },
      weight: {
        selector: '[data-test="link_weight"]',
        type: 'element',
        transform: e => regex(/(\d*)kg/, x => parseInt(x, 10))(e.text()),
      },
      measurements: {
        selector: '[data-test="p-measurements"]',
        type: 'element',
        transform: e => {
          const matches = /(\d{2}).*(\d{2}).*(\d{2})/.exec(e.text().replace(/[\s\n]/gm, ''));
          const parse = (s: string | undefined) => (s ? parseInt(s, 10) : 0);
          if (!matches) {
            return undefined;
          }

          return {
            chest: inchToCm(parse(matches[1] || undefined)),
            waist: inchToCm(parse(matches[2] || undefined)),
            hips: inchToCm(parse(matches[3] || undefined)),
          };
        },
      },
      hasDick: {
        type: 'constant',
        value: false,
      },
      hasPussy: {
        type: 'constant',
        value: true,
      },
      genderExpression: {
        type: 'constant',
        value: 'Female',
      },
      cupsize: {
        selector: '[data-test="p-measurements"]',
        type: 'element',
        transform: e => regex(/\d{2}(.)/, x => (isCupsize(x) ? x : undefined))(e.text()),
      },
      socialMediaLinks: {
        selector: '.social-meta',
        type: 'element',
        transform: e => {
          const matches = e.html()?.match(/ href="(.*?)"/g);
          return !matches
            ? undefined
            : matches.filter(Boolean).map(m => m.replace(/"/g, '').replace(' href=', ''));
        },
      },
      officialWebsite: {
        selector:
          'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.d-flex.flex-column.flex-1.pl-3.pl-md-4.header-content > div > div.d-flex.flex-row.align-items-start.justify-content-between.justify-content-md-start > div.d-flex.flex-column.mr-2.mr-lg-4.align-items-start > div > div.mt-md-1.d-flex.flex-wrap.flex-lg-nowrap.flex-row.align-items-center.align-items-md-start.mr-2 > a',
        type: 'element',
        transform: e => e.attr('href'),
      },
      picture: {
        selector: '.dashboard-image-large img',
        type: 'element',
        transform: e => e.attr('src')?.replace('/teaser/', '/big/'),
      },
    },
  },
  overview: {
    nameToUrl: name => `https://www.freeones.com/babes?q=${encodeURI(name)}`,
    itemSelector: '[data-test="teaser-subject"]',
    fields: {
      name: {
        selector: '[data-test="subject-name"]',
        type: 'element',
        transform: e => e.text().trim(),
      },
      aliases: {
        selector: '.secondary-data-wrapper > .content-container:nth-child(2) > p:first-child',
        type: 'element',
        transform: e =>
          e
            .text()
            .trim()
            .replace('Aliases: ', '')
            .split(', ')
            .map(a => a.trim()),
      },
      detailUrl: {
        selector: '.teaser__link',
        type: 'element',
        transform: e => `https://freeones.com/${e.attr('href')?.replace(/feed$/, 'bio')}`,
      },
      pictureUrl: {
        selector: '.image-content',
        type: 'element',
        transform: e => e.attr('src'),
      },
    },
  },
};
