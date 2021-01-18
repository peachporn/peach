import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateGenreMutation, CreateGenreMutationVariables, GenreCategory } from '@peach/types';
import { DataGridContainer, DataGridEntry } from '../../../components/dataGrid';
import { createGenreMutation } from '../mutations/createGenre.gql';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { genreCategories } from '../../../domain/genre';
import { Modal } from '../../../components/modal';

type CreateGenreFormData = {
  name: string;
  category: GenreCategory;
  kinkiness: string;
  validAsRoot: boolean;
  validAsFetish: boolean;
};

export type CreateGenreFormProps = {
  onSubmit: () => void;
};

export const CreateGenreForm: FunctionalComponent<CreateGenreFormProps> = ({
  onSubmit: onSubmitCallback,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const open = () => setFormVisible(true);

  const { reset, register, handleSubmit } = useForm<CreateGenreFormData>();

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
          ...data,
          kinkiness: parseInt(data.kinkiness, 10),
        },
      },
    }).then(() => {
      toast.success(i('SUCCESS'));
      resetForm();
      onSubmitCallback();
    });

  return (
    <Fragment>
      <button onClick={open}>
        <Icon icon="add" />
      </button>
      <Modal>
        <h2>{i('CREATE_GENRE_FORM_HEADLINE')}</h2>
        <DataGridContainer>
          <DataGridEntry
            label="GENRE_NAME"
            value={
              <input name="name" placeholder="Name" autoFocus ref={register({ required: true })} />
            }
          />
          <DataGridEntry
            label="GENRE_CATEGORY"
            value={
              <select name="category" ref={register}>
                {genreCategories.map(category => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            }
          />
          <DataGridEntry
            label="GENRE_KINKINESS"
            value={
              <input
                name="kinkiness"
                ref={register({
                  required: true,
                  validate: {
                    positiveInt: value => value === '' || parseInt(value, 10) > 0,
                  },
                })}
              />
            }
          />
          <DataGridEntry
            label="GENRE_VALIDASROOT"
            value={<input type="checkbox" ref={register} name="validAsRoot" />}
          />
          <DataGridEntry
            label="GENRE_VALIDASFETISH"
            value={<input type="checkbox" ref={register} name="validAsFetish" />}
          />
        </DataGridContainer>
        <button onClick={() => handleSubmit(onSubmit)()}>{i('CREATE_GENRE_FORM_SUBMIT')}</button>
      </Modal>
    </Fragment>
  );
};
