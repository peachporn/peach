import { ScrapedActress } from '@peach/scrapers';
import { ScrapedActress as GQLScrapedActress } from '@peach/types';
import { nonNullish } from '@peach/utils/src/list';
import { omitIfAllUndefined } from '@peach/utils/src/object';

export const transformScrapedActress = (actress: ScrapedActress): GQLScrapedActress => ({
  name: actress.name,
  picture: actress.picture,

  aliases: actress.aliases,
  appearance: {
    genderExpression: actress.genderExpression ?? 'Female',
    equipment: nonNullish([
      actress.hasPussy
        ? {
            __typename: 'Pussy',
          }
        : undefined,
      actress.hasDick
        ? {
            __typename: 'Dick',
          }
        : undefined,
      actress.cupsize
        ? {
            __typename: 'Tits',
            size: actress.cupsize,
            hasImplants: actress.hasImplants ?? false,
          }
        : undefined,
    ]),
    haircolor: actress.haircolor,
    eyecolor: actress.eyecolor,
    height: actress.height,
    weight: actress.weight,
    measurements: actress.measurements,
    piercings: actress.piercings,
    tattoos: actress.tattoos,
  },
  dates: omitIfAllUndefined({
    dateOfBirth: actress.dateOfDeath,
    dateOfCareerstart: actress.dateOfCareerstart,
    dateOfDeath: actress.dateOfDeath,
    dateOfRetirement: actress.dateOfRetirement,
  }),
  location: omitIfAllUndefined({
    city: actress.city,
    country: actress.country,
    province: actress.province,
    location: actress.location,
  }),
  contact: omitIfAllUndefined({
    officialWebsite: actress.officialWebsite,
    socialMediaLinks: actress.socialMediaLinks,
  }),
});
