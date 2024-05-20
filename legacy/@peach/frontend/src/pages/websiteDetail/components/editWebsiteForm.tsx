import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import {
  UpdateWebsiteMutation,
  UpdateWebsiteMutationVariables,
  WebsiteDetailFragment,
} from '@peach/types';
import { omit } from 'ramda';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { uploadWebsiteImage, uploadWebsiteImageFromUrl } from '../../../fetch/uploadImage';
import { updateWebsiteMutation } from '../mutations/updateWebsite.gql';
import { WebsiteForm, WebsiteFormValues } from '../../../components/websiteForm';

type EditWebsiteFormProps = {
  website: WebsiteDetailFragment;
  onSubmit: () => void;
};

export const EditWebsiteForm: FunctionalComponent<EditWebsiteFormProps> = ({
  website,
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const [updateWebsite] = useMutation<UpdateWebsiteMutation, UpdateWebsiteMutationVariables>(
    updateWebsiteMutation,
  );

  const onSubmit = (data: WebsiteFormValues) =>
    updateWebsite({
      variables: {
        websiteId: website.id,
        data: {
          ...omit(['image', 'imageUrl'], data),
          fetish: data.fetish ? parseInt(data.fetish, 10) : undefined,
        },
      },
    })
      .then(() =>
        data.image?.length
          ? uploadWebsiteImage(website.id, data.image[0])
          : data.imageUrl
          ? uploadWebsiteImageFromUrl(website.id, data.imageUrl)
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
        <WebsiteForm
          headline={website.name}
          defaultValues={{
            name: website.name,
            url: website.url,
            fetish: `${website.fetish?.id || ''}`,
          }}
          onSubmit={onSubmit}
        />
      </Modal>
    </Fragment>
  );
};
