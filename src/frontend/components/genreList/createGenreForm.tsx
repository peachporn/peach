import { FunctionalComponent, Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BubbleButton } from '../../../components/components/bubbleButton';
import { Modal } from '../../../components/components/modal';
import { Input } from '../../../components/components/input';
import { i } from '../../i18n/i18n';
import { Headline2 } from '../../../components/components/headline';
import { isTouched } from '../../utils/form';
import { createGenreMutation } from '../../mutations/createGenre.gql';
import { DataGridContainer, DataGridEntry } from '../../../components/compositions/dataGrid';
import { Select } from '../../../components/components/select';
import { genreCategories } from '../../../domain/genre/fixtures';
import { Checkbox } from '../../../components/components/checkbox';
import { Button } from '../../../components/components/button';

type GenreCardGenre = Pick<Genre, 'id' | 'name' | 'category' | 'picture'>;

type CreateGenreFormData = {
  name: string;
  category: GenreCategory;
  kinkiness: string;
  validAsRoot: boolean;
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
        </DataGridContainer>
        <Button onClick={handleSubmit(onSubmit)}>{i('CREATE_GENRE_FORM_SUBMIT')}</Button>
      </Modal>
    </Fragment>
  );
};
