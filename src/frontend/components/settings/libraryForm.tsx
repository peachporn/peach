import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'preact/hooks';
import {
  Button,
  Headline2,
  Select,
  Table,
  Flex,
  TableCell,
  TableRow,
  toast,
} from '../../../components';
import { i } from '../../i18n/i18n';
import { updateInferMovieTitleMutation } from '../../mutations/updateSettings.gql';
import { scanLibraryMutation } from '../../mutations/scanLibrary.gql';
import { isTouched } from '../../utils/form';
import { SettingsContext } from '../../context/settings';

type LibraryFormData = {
  inferMovieTitle: InferMovieTitle;
};

export const LibraryForm: FunctionalComponent = () => {
  const { inferMovieTitle } = useContext(SettingsContext);

  const [scanLibrary] = useMutation(scanLibraryMutation);
  const [updateInferMovieTitle] = useMutation<MutationUpdateInferMovieTitleArgs>(
    updateInferMovieTitleMutation,
  );
  const {
    formState: { touched },
    register,
    handleSubmit,
  } = useForm<LibraryFormData>({
    defaultValues: {
      inferMovieTitle,
    },
  });
  const onSubmit = (data: LibraryFormData) =>
    updateInferMovieTitle({ variables: data }).then(() => {
      toast.success(i('SETTINGS_FORM_SUCCESS'));
    });

  return (
    <form
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
    >
      <Headline2>{i('SETTINGS_LIBRARY')}</Headline2>
      <Table>
        <TableRow>
          <TableCell>{i('SETTINGS_INFERMOVIETITLE')}</TableCell>
          <TableCell>
            <Select name="inferMovieTitle" ref={register}>
              <option value="FOLDER">{i('SETTINGS_INFERMOVIETITLE_FOLDER')}</option>
              <option value="FILENAME">{i('SETTINGS_INFERMOVIETITLE_FILENAME')}</option>
            </Select>
          </TableCell>
        </TableRow>
      </Table>
      <Flex justify="end">
        {isTouched(touched) && <Button type="submit">{i('FORM_SAVE')}</Button>}
        <Button onClick={() => scanLibrary()}>{i('SETTINGS_SCAN_LIBRARY')}</Button>
      </Flex>
    </form>
  );
};
