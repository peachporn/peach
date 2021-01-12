import { createContext, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { settingsQuery } from './queries/settings.gql';

const defaultSettings: Settings = {
  language: 'EN',
  inferMovieTitle: 'FILENAME',
  actressImagePath: '',
  genreImagePath: '',
  screencapPath: '',
  volumes: [],
};

export const SettingsContext = createContext(defaultSettings);

export const SettingsProvider: FunctionalComponent = ({ children }) => {
  const { data, loading } = useQuery<SettingsQuery>(settingsQuery);
  if (loading) {
    return null;
  }
  return (
    <SettingsContext.Provider value={data?.settings || defaultSettings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
