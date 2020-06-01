import { BaseSyntheticEvent } from 'react';
import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { Button, Headline2, Select, Table, TableCell, TableRow } from '@peach/components';
import { Flex } from '@peach/components/src/components/flex';
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'preact/hooks';
import { i } from '../../i18n/i18n';
import { Language, MutationUpdateLanguageArgs } from '../../generated/types';
import { updateLanguageMutation } from '../../mutations/updateSettings.gql';
import { isTouched } from '../../utils/form';
import { SettingsContext } from '../../context/settings';

type GeneralSettingsFormData = {
  language: Language;
};

export const GeneralSettingsForm: FunctionalComponent = () => {
  const { language } = useContext(SettingsContext);

  const [updateLanguage] = useMutation<MutationUpdateLanguageArgs>(updateLanguageMutation);
  const {
    formState: { touched },
    register,
    handleSubmit,
  } = useForm<GeneralSettingsFormData>({
    defaultValues: {
      language,
    },
  });
  const onSubmit = (data: GeneralSettingsFormData) => updateLanguage({ variables: data });

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
              <option selected={language === Language.En} value={Language.En}>
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
