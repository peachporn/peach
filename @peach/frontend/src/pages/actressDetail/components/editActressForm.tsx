import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import {
  ActressDetailFragment,
  Boobs,
  Cupsize,
  Ethnicity,
  Eyecolor,
  Haircolor,
  UpdateActressMutation,
  UpdateActressMutationVariables,
} from '@peach/types';
import { omit } from 'ramda';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { uploadActressImageFromUrl } from '../../../fetch/uploadImage';
import { ActressForm, ActressFormValues } from '../../../components/actressForm';
import { updateActressMutation } from '../mutations/updateActress.gql';
import { isBoobs, isCupsize, isEthnicity, isEyecolor, isHaircolor } from '../../../domain/actress';
import { formatDateForInput } from '../../../utils/date';

type EditActressFormProps = {
  actress: ActressDetailFragment;
  onSubmit: () => void;
};

export const EditActressForm: FunctionalComponent<EditActressFormProps> = ({
  actress,
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const [updateActress] = useMutation<UpdateActressMutation, UpdateActressMutationVariables>(
    updateActressMutation,
  );

  const onSubmit = (data: ActressFormValues) =>
    updateActress({
      variables: {
        actressId: actress.id,
        data: {
          ...omit(['imageUrl'], data),
          dateOfBirth: data.dateOfBirth || undefined,
          dateOfCareerstart: data.dateOfCareerstart || undefined,
          dateOfRetirement: data.dateOfRetirement || undefined,
          dateOfDeath: data.dateOfDeath || undefined,
          haircolor:
            data.haircolor && isHaircolor(data.haircolor)
              ? (data.haircolor as Haircolor)
              : undefined,
          eyecolor:
            data.eyecolor && isEyecolor(data.eyecolor) ? (data.eyecolor as Eyecolor) : undefined,
          ethnicity:
            data.ethnicity && isEthnicity(data.ethnicity)
              ? (data.ethnicity as Ethnicity)
              : undefined,
          height: data.height ? parseInt(data.height, 10) : undefined,
          weight: data.weight ? parseInt(data.weight, 10) : undefined,
          measurements:
            data.measurements.bust && data.measurements.hips && data.measurements.waist
              ? {
                  bust: parseInt(data.measurements.bust, 10),
                  hips: parseInt(data.measurements.hips, 10),
                  waist: parseInt(data.measurements.waist, 10),
                }
              : undefined,
          cupsize: data.cupsize && isCupsize(data.cupsize) ? (data.cupsize as Cupsize) : undefined,
          boobs: data.boobs && isBoobs(data.boobs) ? (data.boobs as Boobs) : undefined,
        },
      },
    })
      .then(() =>
        data.imageUrl && data.imageUrl !== actress.picture
          ? uploadActressImageFromUrl(actress.id, data.imageUrl)
          : Promise.resolve(),
      )
      .then(() => {
        setVisible(false);
        onSubmitCallback();
      });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={open}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="edit" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <ActressForm
          defaultValues={{
            ...actress,
            aliases: actress.aliases.join('\n'),
            dateOfBirth: actress.dateOfBirth ? formatDateForInput(actress.dateOfBirth) : undefined,
            dateOfCareerstart: actress.dateOfCareerstart
              ? formatDateForInput(actress.dateOfCareerstart)
              : undefined,
            dateOfRetirement: actress.dateOfRetirement
              ? formatDateForInput(actress.dateOfRetirement)
              : undefined,
            dateOfDeath: actress.dateOfDeath ? formatDateForInput(actress.dateOfDeath) : undefined,
            measurements: {
              bust: `${actress.measurements?.bust || ''}`,
              hips: `${actress.measurements?.hips || ''}`,
              waist: `${actress.measurements?.waist || ''}`,
            },
            height: `${actress.height || ''}`,
            weight: `${actress.weight || ''}`,
            socialMediaLinks: (actress.socialMediaLinks || []).join('\n'),
            imageUrl: actress.picture,
          }}
          onSubmit={onSubmit}
        />
      </Modal>
    </Fragment>
  );
};
