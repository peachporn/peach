import { createContext, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Language, Settings, SettingsQuery } from '../generated/types';
import { settingsQuery } from '../queries/settings.gql';

const defaultSettings: Settings = {
  language: Language.En,
};

export const SettingsContext = createContext(defaultSettings);

export const SettingsProvider: FunctionalComponent = ({ children }) => {
  const { data } = useQuery<SettingsQuery>(settingsQuery);
  return (
    <SettingsContext.Provider value={data?.settings || defaultSettings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
