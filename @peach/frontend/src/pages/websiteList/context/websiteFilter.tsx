import { createContext, FunctionalComponent, h } from 'preact';
import { WebsiteFilter } from '@peach/types';
import { useState } from 'preact/hooks';

type WebsiteFilterContextType = {
  filter: WebsiteFilter;
  setName: (name: string) => void;
};

export const WebsiteFilterContext = createContext<WebsiteFilterContextType>({
  filter: {},
  setName: () => {},
});

export const WebsiteFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useState<WebsiteFilter>({});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <WebsiteFilterContext.Provider value={{ filter, setName }}>
      {children}
    </WebsiteFilterContext.Provider>
  );
};
