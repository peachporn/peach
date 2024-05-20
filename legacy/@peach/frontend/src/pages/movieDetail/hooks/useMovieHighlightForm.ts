import { useMutation } from '@apollo/client';
import {
  UpdateGenreDefinitionsMutation,
  UpdateGenreDefinitionsMutationVariables,
} from '@peach/types';
import { useForm, UseFormMethods } from 'react-hook-form';
import { updateGenreDefinitionsMutation } from '../mutations/updateGenreDefinitions.gql';

export type MovieHighlightForm = UseFormMethods<MovieHighlightFormValues>;
type MovieHighlightFormValues = { genreName: string };
export const useMovieHighlightForm = () => {
  const form = useForm<MovieHighlightFormValues>({
    defaultValues: { genreName: '' },
  });

  const [save] = useMutation<
    UpdateGenreDefinitionsMutation,
    UpdateGenreDefinitionsMutationVariables
  >(updateGenreDefinitionsMutation);

  const submit = (variables: UpdateGenreDefinitionsMutationVariables) =>
    save({ variables }).then(() => {
      form.reset();
    });

  return {
    form,
    submit,
  };
};
