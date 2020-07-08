import { Fragment, FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { i } from '../../i18n/i18n';
import { Input } from '../../../components/components/input';
import { uploadActressImage, uploadActressImageFromUrl } from '../../fetch/uploadImage';
import { ActressCard } from '../../../components/components/actressCard';

export type ActressDataFormProps = {
  actress: Pick<Actress, 'id' | 'name' | 'picture'>;
};

type ActressFormData = {
  image: FileList;
  imageUrl: string;
};

export const ActressImageForm: FunctionalComponent<ActressDataFormProps> = ({ actress }) => {
  const { reset, watch, register, handleSubmit } = useForm<ActressFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: ActressFormData) => {
    const upload = data.image.length
      ? uploadActressImage(actress.id, data.image[0])
      : data.imageUrl
      ? uploadActressImageFromUrl(actress.id, data.imageUrl)
      : Promise.reject();

    upload
      .then(() => {
        toast.success(i('ACTRESS_UPLOAD_SUCCESS'));
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
      <ActressCard
        className="actress-detail__card"
        name={actress.name}
        imageUrl={actress.picture}
        shadow
        noName
      />
      <div className="actress-image-form">
        <Input type="file" name="image" ref={register} onChange={handleSubmit(onSubmit)} />
        <Input
          name="imageUrl"
          placeholder={i('IMAGE_URL')}
          ref={register}
          onChange={handleSubmit(onSubmit)}
        />
      </div>
    </Fragment>
  );
};
