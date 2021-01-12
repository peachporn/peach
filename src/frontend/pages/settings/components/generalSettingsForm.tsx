import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'preact/hooks';
import { SettingsContext } from '../../../context/settings';
import {
  Button,
  Flex,
  Headline2,
  Select,
  Table,
  TableCell,
  TableRow,
} from '../../../../components';
import { i } from '../../../i18n/i18n';
import { isTouched } from '../../../utils/form';
import { updateSettingsMutation } from '../mutations/updateSettings.gql';

type GeneralSettingsFormData = {
  language: Language;
};

export const GeneralSettingsForm: FunctionalComponent = () => {
  const { language } = useContext(SettingsContext);

  const [updateSettings] = useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
    updateSettingsMutation,
  );
  const {
    formState: { touched },
    register,
    handleSubmit,
  } = useForm<GeneralSettingsFormData>({
    defaultValues: {
      language,
    },
  });
  const onSubmit = (data: GeneralSettingsFormData) =>
    updateSettings({
      variables: {
        data,
      },
    });

  return (
    <form
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
    >
      <Headline2>{i('SETTINGS_GENERAL')}</Headline2>
      <Table>
        <TableRow>
          <TableCell>{i('SETTINGS_LANGUAGE')}</TableCell>
          <TableCell>
            <Select name="language" ref={register}>
              <option selected={language === 'EN'} value="EN">
                {i('SETTINGS_LANGUAGE_EN')}
              </option>
            </Select>
          </TableCell>
        </TableRow>
      </Table>
      {isTouched(touched) && (
        <Flex justify="end">
          <Button type="submit">{i('FORM_SAVE')}</Button>
        </Flex>
      )}
    </form>
  );
};
