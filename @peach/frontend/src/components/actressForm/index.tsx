import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { formatDateForInput } from '../../utils/date';
import { scrapeActressQuery } from '../../pages/actressList/queries/scrapeActress.gql';
import { Loading } from '../loading';
import { i } from '../../i18n/i18n';
import { Icon } from '../icon';
import { ActressFormFields } from './actressFormFields';

export type ActressFormValues = {
  name: string;
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

  imageUrl: string;
};

export type ActressFormProps = {
  onSubmit: (data: ActressFormValues) => Promise<unknown>;
  onCancel?: () => void;
  defaultValues?: Partial<ActressFormValues>;
  defaultSearchName?: string;
};

export const ActressForm: FunctionalComponent<ActressFormProps> = ({
  onSubmit: onSubmitCallback,
  onCancel,
  defaultValues,
  defaultSearchName,
}) => {
  const [searchName, setSearchName] = useState<string>(defaultSearchName || '');

  const { data, loading } = useQuery(scrapeActressQuery, {
    skip: searchName === '',
    variables: {
      name: searchName,
    },
  });

  const { register, handleSubmit, setValue, watch, reset } = useForm<ActressFormValues>({
    defaultValues,
  });

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
    setValue('imageUrl', picture);
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

  const imageUrl = watch('imageUrl');

  const resetForm = () => {
    reset();
  };

  const actress = data || defaultValues;

  const onSubmit = (values: ActressFormValues) =>
    onSubmitCallback(values).then(() => {
      resetForm();
    });

  return (
    <Fragment>
      <div className="flex items-center">
        {actress ? null : (
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
      {!actress ? null : (
        // @ts-ignore
        <form onSubmit={handleSubmit(onSubmit)}>
          <ActressFormFields className="my-3" register={register} imageUrl={imageUrl} />
          <button className="bg-pink w-full text-white py-1 rounded-sm" type="submit">
            <Icon icon="check" />
          </button>
          <button
            className="bg-grey-200 w-full text-white py-1 rounded-sm"
            onClick={() => {
              setSearchName('');
              if (onCancel) {
                onCancel();
              }
            }}
          >
            <Icon icon="clear" />
          </button>
        </form>
      )}
    </Fragment>
  );
};
