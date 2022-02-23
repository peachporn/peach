import { useQuery } from '@apollo/client';
import { ScrapeActressQuery, ScrapeActressQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useForm } from 'react-hook-form';
import { ActressFormValues } from '../../domain/actress/types/actressFormValues';
import { isTits } from '../../domain/actress/types/appearance';
import { i } from '../../i18n/i18n';
import { scrapeActressQuery } from '../../pages/actressList/queries/scrapeActress.gql';
import { formatDateForInput } from '../../utils/date';
import { Icon } from '../icon';
import { Loading } from '../loading';
import { ActressAlternativeList } from './actressAlternativeList';
import { ActressFormFields } from './actressFormFields';

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
  const [manual, setManual] = useState(false);
  const [searchName, setSearchName] = useState<string>(defaultSearchName || '');

  const { data, loading } = useQuery<ScrapeActressQuery, ScrapeActressQueryVariables>(
    scrapeActressQuery,
    {
      skip: searchName === '',
      variables: {
        name: searchName,
      },
    },
  );

  const form = useForm<ActressFormValues>({
    defaultValues,
  });
  const { handleSubmit, setValue, watch, reset } = form;

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

  const imageUrl = watch('imageUrl');

  const resetForm = () => {
    reset();
  };

  const actress = data?.scrapeActress?.actress || defaultValues;
  const alternatives = data?.scrapeActress?.alternatives || [];

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
                  if (searchName !== '' && actress) {
                    handleSubmit(onSubmit)();
                  } else {
                    setSearchName((e.target as HTMLInputElement).value);
                  }
                }
              }}
            />
          </Fragment>
        )}
      </div>
      {loading ? <Loading /> : null}
      {!alternatives.length ? null : (
        <ActressAlternativeList
          alternatives={alternatives}
          onSelect={alternative => setSearchName(alternative.name)}
        />
      )}
      {!manual && (!actress?.name || alternatives.length) ? null : (
        <form
          className={'max-w-screen-lg mx-auto pb-8'}
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          <ActressFormFields className="my-3" form={form} imageUrl={imageUrl} />
          <button
            className="bg-pink text-white py-1 rounded-sm w-72 mt-12 block mx-auto"
            type="submit"
          >
            <Icon icon="check" />
          </button>
          <button
            className="bg-gray-200 text-white py-1 rounded-sm w-72 mt-2 block mx-auto"
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
      {!manual && !actress?.name && !alternatives.length && !loading ? (
        <div className={'flex items-center flex-col'}>
          <span className="text-lg w-full mt-12 flex justify-center">
            {i('ACTRESS_SCRAPE_NORESULT', { name: searchName })}
          </span>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setValue('name', searchName);
              setManual(true);
            }}
            className="w-full flex flex-col items-center text-center pt-8"
          >
            <Icon
              className="bg-gray-100 rounded-full p-2 mr-1 text-pink text-glow focus:outline-none active:bg-pink active:text-white transition-all"
              icon="add"
            />
            <span className="w-2/3 text-offBlack">
              {i('ACTRESS_NORESULT_ADD', { name: searchName })}
            </span>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
