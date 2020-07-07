import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { i } from '../../i18n/i18n';
import { Input } from '../../../components/components/input';
import { Button } from '../../../components/components/button';
import { FloatingControls } from '../../../components/components/floatingControls';
import { updateGenreMutation } from '../../mutations/updateGenre.gql';
import { DataGridContainer, DataGridEntry } from '../../../components/compositions/dataGrid';
import { Select } from '../../../components/components/select';
import { genreCategories } from '../../../domain/genre/fixtures';
import { Checkbox } from '../../../components/components/checkbox';

export type GenreDataFormProps = {
  genre: Pick<Genre, 'id' | 'name'>;
  cancel: () => void;
  submit: () => void;
};

type GenreFormData = {
  name: string;
  category: GenreCategory;
  kinkiness: string;
  validAsRoot: boolean;
};

export const GenreDataForm: FunctionalComponent<GenreDataFormProps> = ({
  genre,
  cancel,
  submit,
}) => {
  const { reset, watch, register, handleSubmit } = useForm<GenreFormData>({
    mode: 'onChange',
    defaultValues: {
      ...genre,
    },
  });

  const isValidAsRootChecked = watch('validAsRoot');

  const [save] = useMutation<UpdateGenreMutation, UpdateGenreMutationVariables>(
    updateGenreMutation,
  );

  const onSubmit = (data: GenreFormData) => {
    save({
      variables: {
        genreId: genre.id,
        data: {
          ...data,
          kinkiness: data.kinkiness ? parseInt(data.kinkiness, 10) : undefined,
        },
      },
    })
      .then(() => {
        toast.success(i('GENRE_FORM_SUCCESS'));
        reset(data);
        submit();
      })
      .catch(console.error);
  };

  return (
    <div className="genre-data-form">
      <FloatingControls>
        <Button tabIndex={2} appearance="inverted" onClick={handleSubmit(onSubmit)}>
          {i('FORM_SAVE')}
        </Button>
        <Button appearance="inverted" onClick={cancel}>
          {i('FORM_CANCEL')}
        </Button>
      </FloatingControls>
      <Input
        tabIndex={1}
        onEnter={handleSubmit(onSubmit)}
        ref={register}
        name="name"
        appearance="display"
      />
      <DataGridContainer>
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
    </div>
  );
};
