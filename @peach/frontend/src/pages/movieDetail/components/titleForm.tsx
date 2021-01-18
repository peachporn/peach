import { FunctionalComponent, Fragment, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useState } from 'preact/hooks';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { updateTitleMutation } from '../mutations/updateMovie.gql';
import { Button, Headline1, Input } from '../../../../components';
import { i } from '../../../i18n/i18n';
import { FloatingControls } from '../../../../components/components/floatingControls';

export type TitleFormProps = {
  movie: Pick<Movie, 'id' | 'title'>;
};

type TitleFormData = {
  title: string;
};

export const TitleForm: FunctionalComponent<TitleFormProps> = ({ movie }) => {
  const [editing, setEditing] = useState(false);
  const { getValues, reset, watch, register, handleSubmit } = useForm<TitleFormData>({
    mode: 'onChange',
    defaultValues: {
      title: movie.title,
    },
  });

  const [saveTitle] = useMutation<UpdateTitleMutation, UpdateTitleMutationVariables>(
    updateTitleMutation,
  );

  const onSubmit = (data: TitleFormData) => {
    saveTitle({
      variables: {
        movieId: movie.id,
        title: data.title,
      },
    })
      .then(() => {
        toast.success(i('TITLE_FORM_SUCCESS'));
        setEditing(false);
        reset({
          title: data.title,
        });
      })
      .catch(console.error);
  };

  return (
    <div className="title-form">
      {!editing ? (
        <Headline1
          onClick={() => {
            setEditing(true);
          }}
        >
          {getValues().title}
        </Headline1>
      ) : (
        <Fragment>
          <FloatingControls>
            <Button tabIndex={2} appearance="inverted" onClick={handleSubmit(onSubmit)}>
              {i('FORM_SAVE')}
            </Button>
            <Button
              appearance="inverted"
              onClick={() => {
                setEditing(false);
              }}
            >
              {i('FORM_CANCEL')}
            </Button>
          </FloatingControls>
          <Input
            tabIndex={1}
            onEnter={handleSubmit(onSubmit)}
            ref={register}
            name="title"
            appearance="display"
          />
        </Fragment>
      )}
    </div>
  );
};
