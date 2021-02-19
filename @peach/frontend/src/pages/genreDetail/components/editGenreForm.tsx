import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import {
  GenreDetailFragment,
  UpdateGenreMutation,
  UpdateGenreMutationVariables,
} from '@peach/types';
import { omit } from 'ramda';
import { Icon } from '../../../components/icon';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { GenreSearch } from '../../../components/genreSearch';
import { uploadGenreImage, uploadGenreImageFromUrl } from '../../../fetch/uploadImage';
import { GenreForm, GenreFormValues } from '../../../components/genreForm';
import { updateGenreMutation } from '../mutations/updateGenre.gql';

type EditGenreFormProps = {
  genre: GenreDetailFragment;
  onSubmit: () => void;
};

export const EditGenreForm: FunctionalComponent<EditGenreFormProps> = ({
  genre,
  onSubmit: onSubmitCallback,
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);

  const [updateGenre] = useMutation<UpdateGenreMutation, UpdateGenreMutationVariables>(
    updateGenreMutation,
  );

  const onSubmit = (data: GenreFormValues) =>
    updateGenre({
      variables: {
        genreId: genre.id,
        data: {
          ...omit(['image', 'imageUrl'], data),
          kinkiness: parseInt(data.kinkiness, 10),
          linkableChildren: !data.validAsRoot
            ? []
            : data.linkableChildren
                .split(',')
                .map(id => parseInt(id, 10))
                .filter(Boolean),
        },
      },
    })
      .then(() =>
        data.image?.length
          ? uploadGenreImage(genre.id, data.image[0])
          : data.imageUrl
          ? uploadGenreImageFromUrl(genre.id, data.imageUrl)
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
        <GenreForm
          headline={genre.name}
          defaultValues={{
            name: genre.name,
            category: genre.category,
            kinkiness: `${genre.kinkiness}`,
            validAsRoot: genre.validAsRoot,
            validAsFetish: genre.validAsFetish,
            linkableChildren: genre.linkableChildren.map(c => c.id).join(','),
          }}
          onSubmit={onSubmit}
        />
      </Modal>
    </Fragment>
  );
};
