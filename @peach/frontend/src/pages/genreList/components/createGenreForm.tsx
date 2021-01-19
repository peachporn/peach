import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { CreateGenreMutation, CreateGenreMutationVariables, GenreCategory } from '@peach/types';
import { omit } from 'ramda';
import { createGenreMutation } from '../mutations/createGenre.gql';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { colorCodeKinkiness, genreCategories } from '../../../domain/genre';
import { Modal } from '../../../components/modal';
import { Checkbox } from '../../../components/checkbox';
import { uploadGenreImage, uploadGenreImageFromUrl } from '../../../fetch/uploadImage';
import { GenreImageFormFields } from './genreImageFormFields';
import { KinkinessSlider } from './kinkinessSlider';

type CreateGenreFormData = {
  name: string;
  category: GenreCategory;
  kinkiness: string;
  validAsRoot: boolean;
  validAsFetish: boolean;
  image: FileList;
  imageUrl: string;
};

export type CreateGenreFormProps = {
  onSubmit: () => void;
};

export const CreateGenreForm: FunctionalComponent<CreateGenreFormProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const { reset, register, handleSubmit, watch, setValue } = useForm<CreateGenreFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      kinkiness: '10',
    },
  });

  const kinkiness = watch('kinkiness');
  const name = watch('name');
  const isDisabled = !name;

  const [createGenre] = useMutation<CreateGenreMutation, CreateGenreMutationVariables>(
    createGenreMutation,
  );

  const resetForm = () => {
    setFormVisible(false);
    reset();
  };

  const onSubmit = (data: CreateGenreFormData) =>
    createGenre({
      variables: {
        data: {
          ...omit(['image', 'imageUrl'], data),
          kinkiness: parseInt(data.kinkiness, 10),
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
        resetForm();
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
        <h2 className="text-3xl font-display text-glow text-pink mb-6">
          {i('CREATE_GENRE_FORM_HEADLINE')}
        </h2>
        <div className="grid grid-cols-1 gap-5">
          <input
            className="input"
            name="name"
            placeholder="Name"
            autoFocus
            ref={register({ required: true })}
          />

          <select className="bg-white input" name="category" ref={register}>
            {genreCategories.map(category => (
              <option value={category}>{category}</option>
            ))}
          </select>

          <KinkinessSlider
            kinkiness={parseInt(kinkiness, 10)}
            register={register}
            setValue={setValue}
            className="w-full"
          />

          <GenreImageFormFields register={register} />

          <div>
            <Checkbox
              name="validAsRoot"
              register={register}
              label={<span>{i('GENRE_VALIDASROOT')}</span>}
            />

            <Checkbox
              name="validAsFetish"
              register={register}
              label={<span>{i('GENRE_VALIDASFETISH')}</span>}
            />
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
