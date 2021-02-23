import slugify from 'slugify';
import { isCupsize, isEthnicity, isEyecolor, isHaircolor } from '@peach/domain';
import { Ethnicity, Eyecolor, Haircolor } from '@peach/types';
import { ActressScraper } from '../type';
import { filter, regex } from '../transformers';
import { inchToCm } from '../utils/units';

export const FreeonesScraper: ActressScraper = {
  nameToUrl: name => `https://www.freeones.com/${slugify(name)}/profile`,
  fields: {
    name: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.d-flex.flex-column.flex-1.pl-3.pl-md-4.header-content > div > div.d-flex.flex-row.align-items-start.justify-content-between.justify-content-md-start > div.d-flex.flex-column.mr-2.mr-lg-4.align-items-start > h1 > span',
      type: 'text',
    },
    aliases: {
      selector: '[data-test="p_aliases"]',
      type: 'text',
      transform: str => str.split(', ').map(x => x.trim()),
    },
    haircolor: {
      selector: '[data-test="link_span_hair_color"]',
      type: 'text',
      transform: x => (x === 'Brown' ? 'Brunette' : filter<Haircolor>(isHaircolor)(x)),
    },
    eyecolor: {
      selector: '[data-test="link_span_eye_color"]',
      type: 'text',
      transform: filter<Eyecolor>(isEyecolor),
    },
    ethnicity: {
      selector: '[data-test="link_span_ethnicity"]',
      type: 'text',
      transform: x =>
        x === 'Latin' ? 'Latina' : x === 'Black' ? 'Ebony' : filter<Ethnicity>(isEthnicity)(x),
    },
    dateOfBirth: {
      selector: '.profile-meta-item p.mb-1.font-weight-base > a',
      type: 'href',
      transform: regex(/(\d{4}-\d{2}-\d{2})/, x => new Date(Date.parse(x)).toISOString()),
    },
    dateOfCareerstart: {
      selector:
        'body > div.flex-footer-wrapper > div > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.d-lg-flex.flex-1.flex-1--ie11.flex-lg-row > div.d-block.d-lg-flex.flex-lg-column.w-lg-30.pr-2.pr-lg-3.sidebar-right.sidebar-right-wide > div > div.flex-1.mb-4.mb-md-0 > div.timeline-horizontal.mb-3 > div.d-flex.justify-content-between.font-size-md.align-items-center.mb-2 > p:nth-child(1)',
      type: 'text',
      transform: x => new Date(`${x}-01-01`).toISOString(),
    },
    dateOfRetirement: {
      selector: '.timeline-horizontal > div:first-child > p:last-child',
      type: 'text',
      transform: x => (x === 'Now' ? undefined : new Date(`${x}-01-01`).toISOString()),
    },
    dateOfDeath: {
      selector: '.profile-meta-item .hide-on-edit div:nth-child(2)',
      type: 'text',
      transform: x => {
        const matches = x.match(/Passed away on (?<date>.*) at/);
        const date = matches && matches.groups && matches.groups.date;
        if (!date) {
          return undefined;
        }
        return new Date(date).toISOString();
      },
    },
    country: {
      selector: '[data-test="link-country"]',
      type: 'href',
      transform: regex(/=(.*)$/, x => x),
    },
    province: {
      selector: '.profile-meta-item .hide-on-edit p:last-child > a:nth-child(3) > span',
      type: 'text',
    },
    city: {
      selector: '.profile-meta-item .hide-on-edit p:last-child > a:nth-child(2) > span',
      type: 'text',
    },
    boobs: {
      selector: '[data-test="link_span_boobs"]',
      type: 'text',
      transform: x => (x === 'Natural' || x === 'Fake' ? x : undefined),
    },
    piercings: {
      selector: '[data-test="p_has_piercings"]',
      type: 'text',
      transform: x => (x && x.trim() === 'Unknown' ? undefined : x.trim()),
    },
    tattoos: {
      selector: '[data-test="p_has_tattoos"]',
      type: 'text',
      transform: x => (x && x.trim() === 'Unknown' ? undefined : x.trim()),
    },
    height: {
      selector: '[data-test="link_height"]',
      type: 'text',
      transform: regex(/(\d*)cm/, x => parseInt(x, 10)),
    },
    weight: {
      selector: '[data-test="link_weight"]',
      type: 'text',
      transform: regex(/(\d*)kg/, x => parseInt(x, 10)),
    },
    measurements: {
      selector: '[data-test="p-measurements"]',
      type: 'text',
      transform: x => {
        const matches = /(\d{2}).*(\d{2}).*(\d{2})/.exec(x.replace(/[\s\n]/gm, ''));
        const parse = (s: string | undefined) => (s ? parseInt(s, 10) : 0);
        if (!matches) {
          return undefined;
        }

        return {
          bust: inchToCm(parse(matches[1] || undefined)),
          waist: inchToCm(parse(matches[2] || undefined)),
          hips: inchToCm(parse(matches[3] || undefined)),
        };
      },
    },
    cupsize: {
      selector: '[data-test="p-measurements"]',
      type: 'text',
      transform: regex(/\d{2}(.)/, x => (isCupsize(x) ? x : undefined)),
    },
    socialMediaLinks: {
      selector: '.social-meta',
      type: 'html',
      transform: x => {
        const matches = x.match(/ href="(.*?)"/g);
        return !matches
          ? undefined
          : matches.filter(Boolean).map(m => m.replace(/"/g, '').replace(' href=', ''));
      },
    },
    officialWebsite: {
      selector:
        'body > div.height-container.flex-m-row.d-m-flex > div.right-container.flex-m-column.d-m-flex.flex-1 > main > div.px-2.px-md-3 > section > header > div.d-flex.flex-column.flex-1.pl-3.pl-md-4.header-content > div > div.d-flex.flex-row.align-items-start.justify-content-between.justify-content-md-start > div.d-flex.flex-column.mr-2.mr-lg-4.align-items-start > div > div.mt-md-1.d-flex.flex-wrap.flex-lg-nowrap.flex-row.align-items-center.align-items-md-start.mr-2 > a',
      type: 'href',
    },
    picture: {
      selector: '.dashboard-image-large img',
      type: 'src',
      transform: x => x.replace('/teaser/', '/big/'),
    },
  },
};
