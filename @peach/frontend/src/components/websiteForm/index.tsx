import { FunctionalComponent, Fragment, h } from 'preact';
import { useForm } from 'react-hook-form';
import { head } from 'ramda';
import { FetishesQuery, FetishesQueryVariables } from '@peach/types';
import { GenreSearch } from '../genreSearch';
import { i } from '../../i18n/i18n';
import { Icon } from '../icon';
import { WebsiteImageFormFields } from './websiteImageFormFields';

export type WebsiteFormValues = {
  name: string;
  url: string;
  fetish?: string;
  image: FileList;
  imageUrl: string;
};

export type WebsiteFormProps = {
  onSubmit: (data: WebsiteFormValues) => Promise<unknown>;
  headline?: string;
  defaultValues?: Partial<WebsiteFormValues>;
};

export const WebsiteForm: FunctionalComponent<WebsiteFormProps> = ({
  onSubmit: onSubmitCallback,
  headline,
  defaultValues,
}) => {
  const { reset, register, handleSubmit, watch, setValue } = useForm<WebsiteFormValues>({
    defaultValues,
    reValidateMode: 'onBlur',
  });

  const name = watch('name');
  const isDisabled = !name;

  const resetForm = () => {
    reset();
  };

  const onSubmit = (data: WebsiteFormValues) =>
    onSubmitCallback(data).then(() => {
      resetForm();
    });

  return (
    <Fragment>
      <h2 className="text-3xl font-display text-glow text-pink mb-6">
        {headline || i('CREATE_WEBSITE_FORM_HEADLINE')}
      </h2>
      <div className="grid grid-cols-1 gap-5">
        <input
          className="input"
          name="name"
          placeholder={i('WEBSITE_NAME')}
          autoFocus
          ref={register({ required: true })}
        />

        <input
          className="input"
          name="url"
          placeholder={i('WEBSITE_URL')}
          autoFocus
          ref={register({ required: true })}
        />

        <WebsiteImageFormFields register={register} />

        <input className="hidden" name="fetish" ref={register} />
        <GenreSearch
          defaultValue={defaultValues?.fetish ? [parseInt(defaultValues.fetish, 10)] : undefined}
          placeholder={i('FETISH')}
          filterOverride={{ fetish: true }}
          onChange={fetishIds => {
            setValue('fetish', head(fetishIds) || '', { shouldDirty: true });
          }}
        />
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
    </Fragment>
  );
};
