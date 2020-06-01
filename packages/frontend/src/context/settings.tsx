import { createContext, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { InferMovieTitle, Language, Settings, SettingsQuery } from '../generated/types';
import { settingsQuery } from '../queries/settings.gql';

const defaultSettings: Settings = {
  language: Language.En,
  inferMovieTitle: InferMovieTitle.Filename,
  volumes: [],
};

export const SettingsContext = createContext(defaultSettings);

export const SettingsProvider: FunctionalComponent = ({ children }) => {
  const { data, loading } = useQuery<SettingsQuery>(settingsQuery);
  if (loading) {
    return null;
  }
  console.log(data)

  return (
    <SettingsContext.Provider value={data?.settings || defaultSettings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
