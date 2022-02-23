import { ActressDetailFragment } from '@peach/types';
import { liftMaybe } from '@peach/utils/src/function';
import { formatDateForInput } from '../../../utils/date';
import { ActressFormValues } from '../types/actressFormValues';
import { isDick, isPussy, isTits } from '../types/appearance';

export const actressDetailFragmentToFormValues = (
  actress: ActressDetailFragment,
): ActressFormValues => ({
  name: actress?.name ?? '',
  imageUrl: actress.picture || '',
  aliases: actress.aliases.join('\n'),

  genderExpression: actress.appearance?.genderExpression ?? 'Androgynous',
  hasTits: !!actress.appearance?.equipment.find(isTits),
  hasDick: !!actress.appearance?.equipment.find(isDick),
  hasPussy: !!actress.appearance?.equipment.find(isPussy),
  cupsize: actress.appearance?.equipment.find(isTits)?.size ?? '',
  hasImplants:
    actress?.appearance?.equipment.find(isTits)?.hasImplants === undefined
      ? 'unknown'
      : actress?.appearance?.equipment.find(isTits)?.hasImplants
      ? 'true'
      : 'false',
  piercings: actress.appearance?.piercings ?? '',
  tattoos: actress.appearance?.tattoos ?? '',
  height: actress.appearance?.height?.toString() ?? '0',
  weight: actress.appearance?.weight?.toString() ?? '0',

  measurements: {
    chest: `${actress.appearance?.measurements?.chest ?? ''}`,
    hips: `${actress.appearance?.measurements?.hips ?? ''}`,
    waist: `${actress.appearance?.measurements?.waist ?? ''}`,
  },
  haircolor: actress.appearance?.haircolor ?? '',
  eyecolor: actress.appearance?.eyecolor ?? '',

  dateOfBirth: liftMaybe(formatDateForInput)(actress.dates?.dateOfBirth) ?? '',
  dateOfCareerstart: liftMaybe(formatDateForInput)(actress.dates?.dateOfCareerstart) ?? '',
  dateOfRetirement: liftMaybe(formatDateForInput)(actress.dates?.dateOfRetirement) ?? '',
  dateOfDeath: liftMaybe(formatDateForInput)(actress.dates?.dateOfDeath) ?? '',

  city: actress.location?.city ?? '',
  province: actress.location?.province ?? '',
  country: actress.location?.country ?? '',

  officialWebsite: actress.contact?.officialWebsite ?? '',
  socialMediaLinks: (actress.contact?.socialMediaLinks ?? []).join('\n'),
});
