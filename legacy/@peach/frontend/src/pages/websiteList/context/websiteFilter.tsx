import { WebsiteFilterInput } from '@peach/types';
import { createContext, FunctionalComponent, h } from 'preact';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type WebsiteFilterContextType = {
  filterInput: WebsiteFilterInput;
  setName: (name: string) => void;
};

export const WebsiteFilterContext = createContext<WebsiteFilterContextType>({
  filterInput: {},
  setName: () => {},
});

export const WebsiteFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<WebsiteFilterInput>('websiteList-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <WebsiteFilterContext.Provider value={{ filterInput: filter, setName }}>
      {children}
    </WebsiteFilterContext.Provider>
  );
};
