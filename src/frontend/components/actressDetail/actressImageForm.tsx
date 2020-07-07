import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { i } from '../../i18n/i18n';
import { Input } from '../../../components/components/input';
import { uploadActressImage } from '../../fetch/uploadActressImage';

export type ActressDataFormProps = {
  actress: Pick<Actress, 'id'>;
};

type ActressFormData = {
  image: FileList;
};

export const ActressImageForm: FunctionalComponent<ActressDataFormProps> = ({ actress }) => {
  const { reset, watch, register, handleSubmit } = useForm<ActressFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: ActressFormData) => {
    uploadActressImage(actress.id, data.image[0])
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
    <div className="actress-image-form">
      <Input type="file" name="image" ref={register} onChange={handleSubmit(onSubmit)} />
    </div>
  );
};
