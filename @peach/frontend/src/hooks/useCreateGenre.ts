import { useMutation } from '@apollo/client';
import { CreateGenreMutation, CreateGenreMutationVariables } from '@peach/types';
import { omit } from 'ramda';
import { createGenreMutation } from '../pages/genreList/mutations/createGenre.gql';
import { GenreFormValues } from '../components/genreForm';
import { uploadGenreImage, uploadGenreImageFromUrl } from '../fetch/uploadImage';

export const useCreateGenre = () => {
  const [createGenre] = useMutation<CreateGenreMutation, CreateGenreMutationVariables>(
    createGenreMutation,
  );
  return (data: GenreFormValues) =>
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
    }).then(({ data: createGenreData }) => {
      const genreId = createGenreData?.createGenre?.id;
      if (!genreId) return Promise.reject();
      return (
        data.image?.length
          ? uploadGenreImage(genreId, data.image[0])
          : data.imageUrl
          ? uploadGenreImageFromUrl(genreId, data.imageUrl)
          : Promise.resolve()
      ).then(() => createGenreData);
    });
};
