import { createContext, FunctionalComponent, h } from 'preact';
import { WebsiteFilter } from '@peach/types';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type WebsiteFilterContextType = {
  filter: WebsiteFilter;
  setName: (name: string) => void;
};

export const WebsiteFilterContext = createContext<WebsiteFilterContextType>({
  filter: {},
  setName: () => {},
});

export const WebsiteFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<WebsiteFilter>('websitelist-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <WebsiteFilterContext.Provider value={{ filter, setName }}>
      {children}
    </WebsiteFilterContext.Provider>
  );
};
