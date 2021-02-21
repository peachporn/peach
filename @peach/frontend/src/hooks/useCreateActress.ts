import { useMutation } from '@apollo/client';
import {
  Boobs,
  CreateActressMutation,
  CreateActressMutationVariables,
  Cupsize,
  Ethnicity,
  Eyecolor,
  Haircolor,
} from '@peach/types';
import { createActressMutation } from '../pages/actressList/mutations/createActress.gql';
import { ActressFormValues } from '../components/actressForm';

export const useCreateActress = () => {
  const [createActress] = useMutation<CreateActressMutation, CreateActressMutationVariables>(
    createActressMutation,
  );

  return (formData: ActressFormValues) =>
    createActress({
      variables: {
        input: {
          name: formData.name,
          picture: formData.imageUrl || undefined,
          aliases: formData.aliases.split(','),
          haircolor: (formData.haircolor as Haircolor) || undefined,
          eyecolor: (formData.eyecolor as Eyecolor) || undefined,
          ethnicity: (formData.ethnicity as Ethnicity) || undefined,
          dateOfBirth: formData.dateOfBirth || undefined,
          dateOfCareerstart: formData.dateOfCareerstart || undefined,
          dateOfRetirement: formData.dateOfRetirement || undefined,
          dateOfDeath: formData.dateOfDeath || undefined,
          city: formData.city || undefined,
          province: formData.province || undefined,
          country: formData.country || undefined,
          cupsize: (formData.cupsize as Cupsize) || undefined,
          boobs: formData.boobs === 'Unknown' ? undefined : (formData.boobs as Boobs),
          measurements: [
            formData.measurements.bust,
            formData.measurements.waist,
            formData.measurements.hips,
          ].every(m => m)
            ? {
                bust: parseInt(formData.measurements.bust, 10),
                waist: parseInt(formData.measurements.waist, 10),
                hips: parseInt(formData.measurements.hips, 10),
              }
            : undefined,
          height: formData.height ? parseInt(formData.height, 10) : undefined,
          weight: formData.weight ? parseInt(formData.weight, 10) : undefined,
          piercings: formData.piercings || undefined,
          tattoos: formData.tattoos || undefined,
          officialWebsite: formData.officialWebsite || undefined,
          socialMediaLinks: formData.socialMediaLinks.split('\n'),
        },
      },
    });
};
