import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import {
  CreateWebsiteMutation,
  CreateWebsiteMutationVariables,
  WebsiteDetailFragment,
} from '@peach/types';
import { omit } from 'ramda';
import { WebsiteForm } from '../../../components/websiteForm';
import { createWebsiteMutation } from '../mutations/createWebsite.gql';
import { uploadWebsiteImage, uploadWebsiteImageFromUrl } from '../../../fetch/uploadImage';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';

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

  const [createWebsite] = useMutation<CreateWebsiteMutation, CreateWebsiteMutationVariables>(
    createWebsiteMutation,
  );

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
        setFormVisible(false);
        onSubmitCallback();
      });

  return (
    <Fragment>
      <button
        className="fixed bottom-8 rounded-full bg-gray-50 text-pink font-bold left-1/2 transform-gpu -translate-x-1/2 w-14 h-14 pb-3"
        onClick={open}
      >
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={formVisible} setVisible={setFormVisible}>
        <WebsiteForm onSubmit={onSubmit} />
      </Modal>
    </Fragment>
  );
};
