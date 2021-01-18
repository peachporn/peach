import { Fragment, FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Input } from '../../../../components';
import { Image } from '../../../../components/components/image';
import { uploadGenreImage, uploadGenreImageFromUrl } from '../../../fetch/uploadImage';
import { i } from '../../../i18n/i18n';

export type GenreDataFormProps = {
  genre: Pick<Genre, 'id' | 'name' | 'picture'>;
};

type GenreFormData = {
  image: FileList;
  imageUrl: string;
};

export const GenreImageForm: FunctionalComponent<GenreDataFormProps> = ({ genre }) => {
  const { reset, watch, register, handleSubmit } = useForm<GenreFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: GenreFormData) => {
    const upload = data.image.length
      ? uploadGenreImage(genre.id, data.image[0])
      : data.imageUrl
      ? uploadGenreImageFromUrl(genre.id, data.imageUrl)
      : Promise.reject();

    upload
      .then(() => {
        toast.success(i('GENRE_UPLOAD_SUCCESS'));
      })
      .catch(e => {
        toast.error(e.message.toString());
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <Fragment>
      <Image className="genre-detail__card" alt={genre.name} src={genre.picture} />
      <Input type="file" name="image" ref={register} onChange={handleSubmit(onSubmit)} />
      <Input
        name="imageUrl"
        placeholder={i('IMAGE_URL')}
        ref={register}
        onChange={handleSubmit(onSubmit)}
      />
    </Fragment>
  );
};
