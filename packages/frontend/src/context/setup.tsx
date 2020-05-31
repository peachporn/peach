import { createContext, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { SetupStatus, SetupStatusQuery } from '../generated/types';
import { setupStatusQuery } from '../queries/setupStatus.gql';

export const SetupContext = createContext(SetupStatus.Complete);

export const SetupProvider: FunctionalComponent = ({ children }) => {
  const { data } = useQuery<SetupStatusQuery>(setupStatusQuery);

  return (
    <SetupContext.Provider value={data?.setupStatus || SetupStatus.Complete}>
      {children}
    </SetupContext.Provider>
  );
};

export const SetupConsumer = SetupContext.Consumer;
