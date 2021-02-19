import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { CreateGenreMutation, CreateGenreMutationVariables } from '@peach/types';
import { omit } from 'ramda';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { GenreSearch } from '../../../components/genreSearch';
import { createGenreMutation } from '../mutations/createGenre.gql';
import { uploadGenreImage, uploadGenreImageFromUrl } from '../../../fetch/uploadImage';
import { GenreForm, GenreFormValues } from '../../../components/genreForm';

type CreateGenreFormProps = {
  onSubmit: () => void;
};

export const CreateGenreForm: FunctionalComponent<CreateGenreFormProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const [createGenre] = useMutation<CreateGenreMutation, CreateGenreMutationVariables>(
    createGenreMutation,
  );

  const onSubmit = (data: GenreFormValues) =>
    createGenre({
      variables: {
        data: {
          ...omit(['image', 'imageUrl'], data),
          kinkiness: parseInt(data.kinkiness, 10),
          linkableChildren: data.linkableChildren
            .split(',')
            .map(id => parseInt(id, 10))
            .filter(Boolean),
        },
      },
    })
      .then(({ data: createGenreData }) => {
        const genreId = createGenreData?.createGenre?.id;
        if (!genreId) return Promise.reject();
        return data.image?.length
          ? uploadGenreImage(genreId, data.image[0])
          : data.imageUrl
          ? uploadGenreImageFromUrl(genreId, data.imageUrl)
          : Promise.resolve();
      })
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
        <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="add" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <GenreForm onSubmit={onSubmit} />
      </Modal>
    </Fragment>
  );
};
