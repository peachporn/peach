import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
  InferMovieTitle,
  Language,
  SettingsFragment,
  SettingsQuery,
  UpdateSettingsMutation,
  UpdateSettingsMutationVariables,
  Volume,
} from '@peach/types';
import { createContext, FunctionalComponent, h } from 'preact';
import { useForm, UseFormMethods } from 'react-hook-form';
import { updateSettingsMutation } from './mutations/updateSettings.gql';
import { settingsQuery } from './queries/settings.gql';
import { validatePathExists } from './util';

type SettingsFormData = {
  language: Language;
  inferMovieTitle: InferMovieTitle;
  libraryPath: string;
  pinnedFetishes: string;
  volumes: Volume[];
  autoConvertMovie: boolean;
};

type SettingsContextType = {
  settings: SettingsFragment;
  form: UseFormMethods<SettingsFormData>;
  validatePathExists: (value: string) => Promise<boolean>;
  submit: () => void;
};

const defaultSettingsContext: SettingsContextType = {
  settings: {
    id: 0,
    language: 'EN',
    inferMovieTitle: 'FILENAME',
    libraryPath: '',
    volumes: [],
    pinnedFetishes: [],
    autoConvertMovies: true,
  },
  form: {} as UseFormMethods<SettingsFormData>,
  validatePathExists: () => Promise.resolve(false),
  submit: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(defaultSettingsContext);

export const SettingsProvider: FunctionalComponent = ({ children }) => {
  const client = useApolloClient();
  const { data, loading } = useQuery<SettingsQuery>(settingsQuery);
  const [updateSettings] = useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(
    updateSettingsMutation,
  );

  if (loading || !data) {
    return null;
  }

  const defaultValues = (settings: SettingsFragment) => ({
    ...settings,
    libraryPath: settings.libraryPath || undefined,
    pinnedFetishes: settings.pinnedFetishes.map(f => f.id).join(','),
  });

  const form = useForm<SettingsFormData>({
    defaultValues: defaultValues(data.settings),
  });

  const onSubmit = (formData: SettingsFormData) => {
    const pinnedFetishes = formData.pinnedFetishes
      .split(',')
      .filter(Boolean)
      .map(f => parseInt(f, 10));

    return updateSettings({
      variables: {
        data: {
          ...formData,
          volumes: formData.volumes || [],
          pinnedFetishes,
        },
      },
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: data.settings,
        form,
        validatePathExists: validatePathExists(client),
        submit: form.handleSubmit(onSubmit),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
