import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { i } from '../../i18n/i18n';
import { Input } from '../../../components/components/input';
import { uploadGenreImage } from '../../fetch/uploadImage';

export type GenreDataFormProps = {
  genre: Pick<Genre, 'id'>;
};

type GenreFormData = {
  image: FileList;
};

export const GenreImageForm: FunctionalComponent<GenreDataFormProps> = ({ genre }) => {
  const { reset, watch, register, handleSubmit } = useForm<GenreFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: GenreFormData) => {
    uploadGenreImage(genre.id, data.image[0])
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
    <div className="genre-image-form">
      <Input type="file" name="image" ref={register} onChange={handleSubmit(onSubmit)} />
    </div>
  );
};
