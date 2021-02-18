import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
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
import { i } from '../../../i18n/i18n';
import { scrapeActressQuery } from '../queries/scrapeActress.gql';
import { Icon } from '../../../components/icon';
import { ActressFormFields } from '../../../components/actressFormFields';
import { formatDateForInput } from '../../../utils/date';
import { createActressMutation } from '../mutations/createActress.gql';
import { Loading } from '../../../components/loading';

export type CreateActressFormProps = {
  onSubmit: () => void;
};

type CreateActressFormData = {
  name: string;
  picture: string;
  aliases: string;
  haircolor: string;
  eyecolor: string;
  ethnicity: string;
  dateOfBirth: string;
  dateOfCareerstart: string;
  dateOfRetirement: string;
  dateOfDeath: string;
  city: string;
  province: string;
  country: string;
  cupsize: string;
  boobs: string;
  measurements: {
    bust: string;
    waist: string;
    hips: string;
  };
  height: string;
  weight: string;
  piercings: string;
  tattoos: string;
  officialWebsite: string;
  socialMediaLinks: string;
};

export const CreateActressForm: FunctionalComponent<CreateActressFormProps> = ({ onSubmit }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');

  const { data, loading } = useQuery(scrapeActressQuery, {
    skip: searchName === '',
    variables: {
      name: searchName,
    },
  });

  const { register, handleSubmit, setValue, watch, reset } = useForm<CreateActressFormData>();

  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible]);

  useEffect(() => {
    if (!data) return;
    const {
      scrapeActress: {
        name,
        picture,
        aliases,
        haircolor,
        eyecolor,
        ethnicity,
        dateOfBirth,
        dateOfCareerstart,
        dateOfRetirement,
        dateOfDeath,
        city,
        province,
        country,
        cupsize,
        boobs,
        measurements,
        height,
        weight,
        piercings,
        tattoos,
        socialMediaLinks,
        officialWebsite,
      },
    } = data;

    setValue('name', name);
    setValue('picture', picture);
    setValue('aliases', aliases);
    setValue('haircolor', haircolor);
    setValue('eyecolor', eyecolor);
    setValue('ethnicity', ethnicity);
    if (dateOfBirth) {
      setValue('dateOfBirth', formatDateForInput(dateOfBirth));
    }
    if (dateOfCareerstart) {
      setValue('dateOfCareerstart', formatDateForInput(dateOfCareerstart));
    }
    if (dateOfRetirement) {
      setValue('dateOfRetirement', formatDateForInput(dateOfRetirement));
    }
    if (dateOfDeath) {
      setValue('dateOfDeath', formatDateForInput(dateOfDeath));
    }
    setValue('city', city);
    setValue('province', province);
    setValue('country', country);
    setValue('cupsize', cupsize);
    setValue('boobs', boobs);
    if (measurements) {
      setValue('measurements.bust', measurements.bust);
      setValue('measurements.waist', measurements.waist);
      setValue('measurements.hips', measurements.hips);
    }
    setValue('height', height);
    setValue('weight', weight);
    setValue('piercings', piercings);
    setValue('tattoos', tattoos);
    setValue('socialMediaLinks', socialMediaLinks.join('\n'));
    setValue('officialWebsite', officialWebsite);
  }, [data]);

  const picture = watch('picture');

  const [createActress] = useMutation<CreateActressMutation, CreateActressMutationVariables>(
    createActressMutation,
  );

  const submit = (formData: CreateActressFormData) => {
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
      if (onSubmit) {
        onSubmit();
      }
      setVisible(false);
      setSearchName('');
    });
  };

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={() => setVisible(true)}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex items-center">
          {data ? null : (
            <Fragment>
              <Icon icon="search" />
              <input
                className="input w-full mr-8"
                placeholder={i('ACTRESS_CREATE_PLACEHOLDER')}
                value={searchName}
                onKeyUp={e => {
                  if (e.key === 'Enter') {
                    setSearchName((e.target as HTMLInputElement).value);
                  }
                }}
              />
            </Fragment>
          )}
        </div>
        {loading ? <Loading /> : null}
        {!data ? null : (
          // @ts-ignore
          <form onSubmit={handleSubmit(submit)}>
            <ActressFormFields className="my-3" register={register} picture={picture} />
            <button className="bg-pink w-full text-white py-1 rounded-sm" type="submit">
              <Icon icon="check" />
            </button>
            <button
              className="bg-grey-200 w-full text-white py-1 rounded-sm"
              onClick={() => {
                setSearchName('');
                setVisible(false);
              }}
            >
              <Icon icon="clear" />
            </button>
          </form>
        )}
      </Modal>
    </Fragment>
  );
};
