import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
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
import { Modal } from '../../../components/modal';
import { Icon } from '../../../components/icon';
import { createActressMutation } from '../mutations/createActress.gql';
import { ActressForm, ActressFormValues } from '../../../components/actressForm';

export type CreateActressFormProps = {
  onSubmit: () => void;
};

export const CreateActressForm: FunctionalComponent<CreateActressFormProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const [createActress] = useMutation<CreateActressMutation, CreateActressMutationVariables>(
    createActressMutation,
  );

  const onSubmit = (formData: ActressFormValues) =>
    createActress({
      variables: {
        input: {
          name: formData.name,
          picture: formData.picture || undefined,
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
    }).then(() => {
      setVisible(false);
      onSubmitCallback();
    });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={() => setVisible(true)}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <ActressForm
          onSubmit={onSubmit}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </Fragment>
  );
};
