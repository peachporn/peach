import { FunctionalComponent, Fragment, h } from 'preact';
import { useForm } from 'react-hook-form';
import { GenreCategory } from '@peach/types';
import { genreCategories } from '../../domain/genre';
import { GenreImageFormFields } from './genreImageFormFields';
import { GenreSearch } from '../genreSearch';
import { Checkbox } from '../checkbox';
import { KinkinessSlider } from '../../pages/genreList/components/kinkinessSlider';
import { i } from '../../i18n/i18n';
import { Icon } from '../icon';

export type GenreFormValues = {
  name: string;
  category: GenreCategory;
  kinkiness: string;
  validAsRoot: boolean;
  validAsFetish: boolean;
  linkableChildren: string;
  image: FileList;
  imageUrl: string;
};

export type GenreFormProps = {
  onSubmit: (data: GenreFormValues) => Promise<unknown>;
  onCancel?: () => void;
  headline?: string;
  defaultValues?: Partial<GenreFormValues>;
};

export const GenreForm: FunctionalComponent<GenreFormProps> = ({
  onSubmit: onSubmitCallback,
  onCancel,
  headline,
  defaultValues,
}) => {
  const { reset, register, handleSubmit, watch, setValue } = useForm<GenreFormValues>({
    reValidateMode: 'onBlur',
    defaultValues: {
      kinkiness: '10',
      ...defaultValues,
    },
  });

  const kinkiness = watch('kinkiness');
  const name = watch('name');
  const validAsRoot = watch('validAsRoot');
  const linkableChildren = watch('linkableChildren');
  const isDisabled = !name;

  const resetForm = () => {
    reset();
  };

  const onSubmit = (data: GenreFormValues) =>
    onSubmitCallback(data).then(() => {
      resetForm();
    });

  return (
    <Fragment>
      <h2 className="text-3xl font-display text-glow text-pink mb-6">
        {headline || i('CREATE_GENRE_FORM_HEADLINE')}
      </h2>
      <div className="grid grid-cols-1 gap-5">
        <input
          className="input"
          name="name"
          placeholder="Name"
          autoFocus
          ref={register({ required: true })}
        />

        <select className="bg-white input" name="category" ref={register}>
          {genreCategories.map(category => (
            <option value={category}>{category}</option>
          ))}
        </select>

        <KinkinessSlider
          kinkiness={parseInt(kinkiness, 10)}
          register={register}
          setValue={setValue}
          className="w-full"
        />

        <GenreImageFormFields register={register} />

        <div>
          <Checkbox
            name="validAsFetish"
            register={register}
            label={<span>{i('GENRE_VALIDASFETISH')}</span>}
          />

          <Checkbox
            name="validAsRoot"
            register={register}
            label={<span>{i('GENRE_VALIDASROOT')}</span>}
          />
        </div>

        <input type="hidden" name="linkableChildren" ref={register} />
        {!validAsRoot ? null : (
          <GenreSearch
            defaultValue={defaultValues?.linkableChildren
              ?.split(',')
              .map(id => parseInt(id, 10))
              .filter(Boolean)}
            onChange={genres => {
              setValue('linkableChildren', genres);
            }}
            placeholder={i('SUBGENRES')}
            multiple
          />
        )}
      </div>

      <button
        className={`${
          isDisabled ? 'bg-gray-200' : 'bg-pink'
        } rounded-sm text-white py-1 px-3 w-full mt-4`}
        disabled={isDisabled}
        onClick={() => handleSubmit(onSubmit)()}
      >
        <Icon icon="check" />
      </button>
      <button
        className="bg-grey-200 w-full text-white py-1 rounded-sm"
        onClick={() => {
          resetForm();
          if (onCancel) {
            onCancel();
          }
        }}
      >
        <Icon icon="clear" />
      </button>
    </Fragment>
  );
};
