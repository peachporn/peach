import { useQuery } from '@apollo/client';
import { ScrapeActressQuery, ScrapeActressQueryVariables } from '@peach/types';
import { useEffect } from 'preact/hooks';
import { UseFormMethods } from 'react-hook-form';
import { ActressFormValues } from '../../../domain/actress/types/actressFormValues';
import { isTits } from '../../../domain/actress/types/appearance';
import { scrapeActressQuery } from '../../../pages/actressList/queries/scrapeActress.gql';
import { formatDateForInput } from '../../../utils/date';

export const useScrapeActress = (searchName: string, form: UseFormMethods<ActressFormValues>) => {
  const { setValue } = form;

  const { data, loading } = useQuery<ScrapeActressQuery, ScrapeActressQueryVariables>(
    scrapeActressQuery,
    {
      skip: searchName === '',
      variables: {
        name: searchName,
      },
    },
  );

  useEffect(() => {
    if (!data?.scrapeActress?.actress) return;
    const actress = data.scrapeActress.actress;

    const { name, picture, aliases } = actress;

    const initialValues = {
      name,
      imageUrl: picture,
      aliases,

      cupsize: actress.appearance?.equipment.find(isTits)?.size,
      hasImplants: actress.appearance?.equipment.find(isTits)?.hasImplants,
      height: actress.appearance?.height,
      weight: actress.appearance?.weight,
      piercings: actress.appearance?.piercings,
      tattoos: actress.appearance?.tattoos,
      'measurements.chest': actress.appearance?.measurements?.chest,
      'measurements.waist': actress.appearance?.measurements?.waist,
      'measurements.hips': actress.appearance?.measurements?.hips,

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

      ...actress.location,
      ...actress.contact,
    };

    Object.entries(initialValues).forEach(([key, value]) => {
      setValue(key, value);
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
