import { isCupsize, isEyecolor, isHaircolor } from '@peach/domain';
import { Cupsize, Eyecolor, Haircolor } from '@peach/types';
import slugify from 'slugify';
import { filter, regex } from '../transformers';
import { ActressScraper } from '../type';

export const FreeonesScraper: ActressScraper = {
  name: 'Freeones',
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
        selector: '[data-test="link_span_dateOfBirth"]',
        type: 'element',
        transform: e => {
          try {
            return new Date(e.text().trim()).toISOString();
          } catch {
            return '';
          }
        },
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
          e.text().trim().toLowerCase() === 'now'
            ? undefined
            : new Date(`${e.text()}-01-01`).toISOString(),
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
        selector: '[data-test="link_placeOfBirth"][href*="country"]',
        type: 'element',
        transform: e => regex(/=(.*)$/, x => x)(decodeURIComponent(e.attr('href') ?? '')),
      },
      province: {
        selector: '[data-test="link_placeOfBirth"][href*="province"]',
        type: 'element',
        transform: e => regex(/=(.*)$/, x => x)(decodeURIComponent(e.attr('href') ?? '')),
      },
      city: {
        selector: '[data-test="link_placeOfBirth"][href*="placeOfBirth"]',
        type: 'element',
        transform: e => regex(/=(.*)$/, x => x)(decodeURIComponent(e.attr('href') ?? '')),
      },
      hasImplants: {
        selector: '[data-test="link_span_boobs"]',
        type: 'element',
        transform: e => e.text().trim() === 'Fake',
      },
      piercings: {
        selector: '[data-test="link_span_piercingLocations"]',
        type: 'element',
        transform: e => (e.text().trim() === 'Unknown' ? undefined : e.text().trim()),
      },
      tattoos: {
        selector: '[data-test="link_span_tattooLocations"]',
        type: 'element',
        transform: e => (e.text().trim() === 'Unknown' ? undefined : e.text().trim()),
      },
      height: {
        selector: '[data-test="link_height"]',
        type: 'element',
        transform: e => regex(/(\d+)\s*cm/, x => parseInt(x.trim(), 10))(e.text()),
      },
      weight: {
        selector: '[data-test="link_weight"]',
        type: 'element',
        transform: e => regex(/(\d+)\s*kg/, x => parseInt(x.trim(), 10))(e.text()),
      },
      measurements: {
        selector:
          '[data-test="link_span_bra"], [data-test="link_span_waist"], [data-test="link_span_hip"]',
        type: 'element',
        transform: e => {
          const values = e
            .text()
            .split(/\s+/)
            .map(v => /(\d{2})/.exec(v)?.[0])
            .filter(Boolean)
            .map(x => parseInt(x!, 10));

          if (values.length !== 3) return undefined;

          const [chest, waist, hips] = values;
          return { chest, waist, hips };
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
        selector: '[data-test="link_span_cup"]',
        type: 'element',
        transform: e => (isCupsize(e.text().trim()) ? (e.text().trim() as Cupsize) : undefined),
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
        transform: e => `https://freeones.com${e.attr('href')?.replace(/feed$/, 'bio')}`,
      },
      pictureUrl: {
        selector: '.image-content',
        type: 'element',
        transform: e => e.attr('src'),
      },
    },
  },
};
