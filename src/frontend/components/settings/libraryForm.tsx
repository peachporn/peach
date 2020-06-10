import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { ApolloClient } from 'apollo-boost';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
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
  Input,
} from '../../../components';
import { i } from '../../i18n/i18n';
import {
  updateInferMovieTitleMutation,
  updateScreencapPathMutation,
} from '../../mutations/updateSettings.gql';
import { scanLibraryMutation } from '../../mutations/scanLibrary.gql';
import { isTouched } from '../../utils/form';
import { SettingsContext } from '../../context/settings';
import { pathExistsQuery } from '../../queries/settings.gql';

type LibraryFormData = {
  inferMovieTitle: InferMovieTitle;
  screencapPath: string;
};

const validateExistingPath = (client: ApolloClient<object>) => (value: string) =>
  client
    .query<PathExistsQuery, PathExistsQueryVariables>({
      query: pathExistsQuery,
      variables: {
        path: value,
      },
    })
    .then(result => result.data?.pathExists);

export const LibraryForm: FunctionalComponent = () => {
  const client = useApolloClient();
  const { inferMovieTitle, screencapPath } = useContext(SettingsContext);

  const [scanLibrary] = useMutation(scanLibraryMutation);
  const [updateInferMovieTitle] = useMutation<MutationUpdateInferMovieTitleArgs>(
    updateInferMovieTitleMutation,
  );
  const [updateScreencapPath] = useMutation<MutationUpdateScreencapPathArgs>(
    updateScreencapPathMutation,
  );
  const {
    formState: { touched },
    errors,
    register,
    handleSubmit,
  } = useForm<LibraryFormData>({
    defaultValues: {
      inferMovieTitle,
      screencapPath,
    },
  });
  const onSubmit = (data: LibraryFormData) =>
    Promise.all([
      updateInferMovieTitle({ variables: data }),
      updateScreencapPath({ variables: data }),
    ]).then(() => {
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
        <TableRow>
          <TableCell>{i('SETTINGS_SCREENCAPPATH')}</TableCell>
          <TableCell>
            <Input
              appearance="wide"
              name="screencapPath"
              error={!!errors.screencapPath}
              ref={register({
                validate: validateExistingPath(client),
              })}
            />
          </TableCell>
        </TableRow>
      </Table>
      <Flex justify="end">
        {isTouched(touched) && <Button type="submit">{i('FORM_SAVE')}</Button>}
        <Button
          onClick={() =>
            scanLibrary().then(() => {
              toast.success(i('LIBRARY_SCAN_STARTED'));
            })}
        >
          {i('SETTINGS_SCAN_LIBRARY')}
        </Button>
      </Flex>
    </form>
  );
};
