import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { ApolloClient } from 'apollo-boost';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'preact/hooks';
import { toast } from 'react-toastify';
import {
  Button,
  Flex,
  Headline2,
  Input,
  Select,
  Table,
  TableCell,
  TableRow,
} from '../../../../components';
import { i } from '../../../i18n/i18n';
import { SettingsContext } from '../../../context/settings';
import { isTouched } from '../../../utils/form';
import { updateSettingsMutation } from '../mutations/updateSettings.gql';
import { pathExistsQuery } from '../queries/settings.gql';

type LibraryFormData = {
  inferMovieTitle: InferMovieTitle;
  screencapPath: string;
  actressImagePath: string;
  genreImagePath: string;
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
  const { inferMovieTitle, actressImagePath, genreImagePath, screencapPath } = useContext(
    SettingsContext,
  );

  const [updateSettings] = useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
    updateSettingsMutation,
  );

  const {
    formState: { touched },
    reset,
    errors,
    register,
    handleSubmit,
  } = useForm<LibraryFormData>({
    defaultValues: {
      inferMovieTitle,
      actressImagePath,
      genreImagePath,
      screencapPath,
    },
  });
  const onSubmit = (data: LibraryFormData) =>
    updateSettings({
      variables: {
        data,
      },
    }).then(() => {
      toast.success(i('SETTINGS_FORM_SUCCESS'));
      reset(data);
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
        <TableRow>
          <TableCell>{i('SETTINGS_ACTRESSIMAGEPATH')}</TableCell>
          <TableCell>
            <Input
              appearance="wide"
              name="actressImagePath"
              error={!!errors.actressImagePath}
              ref={register({
                validate: validateExistingPath(client),
              })}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{i('SETTINGS_GENREIMAGEPATH')}</TableCell>
          <TableCell>
            <Input
              appearance="wide"
              name="genreImagePath"
              error={!!errors.genreImagePath}
              ref={register({
                validate: validateExistingPath(client),
              })}
            />
          </TableCell>
        </TableRow>
      </Table>
      <Flex justify="end">
        {isTouched(touched) && <Button type="submit">{i('FORM_SAVE')}</Button>}
      </Flex>
    </form>
  );
};
