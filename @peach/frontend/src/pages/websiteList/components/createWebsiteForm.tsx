import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { omit } from 'ramda';
import {
  CreateWebsiteMutation,
  CreateWebsiteMutationVariables,
  FetishesQuery,
  FetishesQueryVariables,
  WebsiteFetishesQuery,
  WebsiteFetishesQueryVariables,
} from '@peach/types';
import uniqBy from 'ramda/es/uniqBy';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { uploadWebsiteImage, uploadWebsiteImageFromUrl } from '../../../fetch/uploadImage';
import { WebsiteImageFormFields } from './websiteImageFormFields';
import { createWebsiteMutation } from '../mutations/createWebsite.gql';
import { websiteFetishesQuery } from '../queries/websiteFetishes.gql';
import { fetishesQuery } from '../../settings/queries/fetishes.gql';
import { FetishBubble } from '../../../components/fetishBubble';

type CreateWebsiteFormData = {
  name: string;
  url: string;
  fetish?: string;
  image: FileList;
  imageUrl: string;
};

export type CreateWebsiteFormProps = {
  onSubmit: () => void;
};

export const CreateWebsiteForm: FunctionalComponent<CreateWebsiteFormProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const { reset, register, handleSubmit, watch, setValue } = useForm<CreateWebsiteFormData>({
    reValidateMode: 'onBlur',
  });

  const name = watch('name');
  const fetish = watch('fetish');
  const isDisabled = !name;

  const [createWebsite] = useMutation<CreateWebsiteMutation, CreateWebsiteMutationVariables>(
    createWebsiteMutation,
  );

  const resetForm = () => {
    setFormVisible(false);
    reset();
  };

  const onSubmit = (data: CreateWebsiteFormData) =>
    createWebsite({
      variables: {
        data: {
          ...omit(['image', 'imageUrl'], data),
          fetish: data.fetish ? parseInt(data.fetish, 10) : undefined,
        },
      },
    })
      .then(({ data: createWebsiteData }) => {
        const websiteId = createWebsiteData?.createWebsite?.id;
        if (!websiteId) return Promise.reject();
        return data.image?.length
          ? uploadWebsiteImage(websiteId, data.image[0])
          : data.imageUrl
          ? uploadWebsiteImageFromUrl(websiteId, data.imageUrl)
          : Promise.resolve();
      })
      .then(() => {
        resetForm();
        onSubmitCallback();
      });

  const [fetishName, setFetishName] = useState<string>('');
  const { data } = useQuery<WebsiteFetishesQuery, WebsiteFetishesQueryVariables>(
    websiteFetishesQuery,
    {
      variables: { name: fetishName, limit: 5 },
      skip: fetishName.trim() === '',
    },
  );

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={open}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={formVisible} setVisible={setFormVisible}>
        <h2 className="text-3xl font-display text-glow text-pink mb-6">
          {i('CREATE_WEBSITE_FORM_HEADLINE')}
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

          <input
            className="input"
            placeholder={i('SETTINGS_PINNEDFETISHES_PLACEHOLDER')}
            onKeyUp={event => setFetishName((event.target as HTMLInputElement)?.value)}
          />
          <input className="hidden" name="fetish" ref={register} />
          <div className="grid grid-cols-5 mt-2 h-20">
            {uniqBy(g => g.id, data?.genres || []).map(g => (
              <FetishBubble
                className={fetish === `${g.id}` ? '' : 'opacity-70'}
                onClick={() => {
                  setValue('fetish', g.id, { shouldDirty: true });
                }}
                genre={g}
              />
            ))}
          </div>
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
      </Modal>
    </Fragment>
  );
};
