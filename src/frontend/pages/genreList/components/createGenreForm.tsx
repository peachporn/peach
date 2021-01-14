import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Headline2, Input, Select } from '../../../../components';
import { BubbleButton } from '../../../../components/components/bubbleButton';
import { DataGridContainer, DataGridEntry } from '../../../components/dataGrid';
import { Checkbox } from '../../../../components/components/checkbox';
import { createGenreMutation } from '../mutations/createGenre.gql';
import { i } from '../../../i18n/i18n';
import { genreCategories } from '../../../../domain/genre/fixtures';
import { Modal } from '../../../../components/components/modal';

type GenreCardGenre = Pick<Genre, 'id' | 'name' | 'category' | 'picture'>;

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
      <BubbleButton label="+" onClick={open} />
      <Modal visible={formVisible} setVisible={setFormVisible} appearance="tiny">
        <Headline2>{i('CREATE_GENRE_FORM_HEADLINE')}</Headline2>
        <DataGridContainer>
          <DataGridEntry
            label="GENRE_NAME"
            value={
              <Input
                appearance="wide"
                name="name"
                placeholder="Name"
                autoFocus
                ref={register({ required: true })}
              />
            }
          />
          <DataGridEntry
            label="GENRE_CATEGORY"
            value={
              <Select name="category" ref={register}>
                {genreCategories.map(category => (
                  <option value={category}>{category}</option>
                ))}
              </Select>
            }
          />
          <DataGridEntry
            label="GENRE_KINKINESS"
            value={
              <Input
                name="kinkiness"
                appearance="wide"
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
            value={<Checkbox ref={register} name="validAsRoot" />}
          />
          <DataGridEntry
            label="GENRE_VALIDASFETISH"
            value={<Checkbox ref={register} name="validAsFetish" />}
          />
        </DataGridContainer>
        <Button onClick={handleSubmit(onSubmit)}>{i('CREATE_GENRE_FORM_SUBMIT')}</Button>
      </Modal>
    </Fragment>
  );
};
