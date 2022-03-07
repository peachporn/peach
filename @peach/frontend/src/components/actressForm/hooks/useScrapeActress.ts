import { useQuery } from '@apollo/client';
import { ScrapeActressQuery, ScrapeActressQueryVariables } from '@peach/types';
import { useEffect } from 'preact/hooks';
import { UseFormMethods } from 'react-hook-form';
import { ActressFormValues } from '../../../domain/actress/types/actressFormValues';
import { isDick, isPussy, isTits } from '../../../domain/actress/types/appearance';
import { formatDateForInput } from '../../../utils/date';
import { scrapeActressQuery } from '../queries/scrapeActress.gql';

export const useScrapeActress = (
  searchName: string,
  chosenAlternativeDetailUrl: string,
  form: UseFormMethods<ActressFormValues>,
) => {
  const { reset } = form;

  const { data, loading } = useQuery<ScrapeActressQuery, ScrapeActressQueryVariables>(
    scrapeActressQuery,
    {
      skip: searchName === '' && chosenAlternativeDetailUrl === '',
      variables: {
        request: {
          name: searchName,
          detailUrl: chosenAlternativeDetailUrl,
        },
      },
    },
  );

  useEffect(() => {
    if (!data?.scrapeActress?.actress) return;
    const actress = data.scrapeActress.actress;

    const { name, picture, aliases } = actress;

    reset({
      name: name ?? undefined,
      imageUrl: picture ?? undefined,
      aliases: aliases?.join('\n') ?? undefined,

      genderExpression: actress.appearance?.genderExpression,
      hasDick: !!actress.appearance?.equipment.find(isDick),
      hasPussy: !!actress.appearance?.equipment.find(isPussy),
      hasTits: !!actress.appearance?.equipment.find(isTits),
      cupsize: actress.appearance?.equipment.find(isTits)?.size,
      hasImplants: actress.appearance?.equipment.find(isTits)?.hasImplants ? 'true' : 'false',
      height: actress.appearance?.height?.toString(),
      weight: actress.appearance?.weight?.toString(),
      piercings: actress.appearance?.piercings ?? undefined,
      tattoos: actress.appearance?.tattoos ?? undefined,
      haircolor: actress?.appearance?.haircolor ?? undefined,
      eyecolor: actress?.appearance?.eyecolor ?? undefined,
      measurements: {
        chest: actress.appearance?.measurements?.chest.toString() ?? undefined,
        waist: actress.appearance?.measurements?.waist.toString() ?? undefined,
        hips: actress.appearance?.measurements?.hips.toString() ?? undefined,
      },

      dateOfBirth: actress.dates?.dateOfBirth
        ? formatDateForInput(actress.dates?.dateOfBirth)
        : undefined,
      dateOfCareerstart: actress.dates?.dateOfCareerstart
        ? formatDateForInput(actress.dates?.dateOfCareerstart)
        : undefined,
      dateOfRetirement: actress.dates?.dateOfRetirement
        ? formatDateForInput(actress.dates?.dateOfRetirement)
        : undefined,
      dateOfDeath: actress.dates?.dateOfDeath
        ? formatDateForInput(actress.dates?.dateOfDeath)
        : undefined,

      socialMediaLinks: actress.contact?.socialMediaLinks?.join('\n'),
      officialWebsite: actress.contact?.officialWebsite ?? undefined,
      city: actress.location?.city ?? undefined,
      province: actress.location?.province ?? undefined,
      country: actress.location?.country ?? undefined,
    });
  }, [data]);

  const actress = data?.scrapeActress?.actress;
  const alternatives = data?.scrapeActress?.alternatives || [];

  return {
    actress,
    alternatives,
    loading,
  };
};
