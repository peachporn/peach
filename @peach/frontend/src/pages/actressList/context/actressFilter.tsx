import { createContext, FunctionalComponent, h } from 'preact';
import { ActressFilter } from '@peach/types';
import { useState } from 'preact/hooks';

type ActressFilterContextType = {
  filter: ActressFilter;
  setName: (name: string) => void;
};

export const ActressFilterContext = createContext<ActressFilterContextType>({
  filter: {},
  setName: () => {},
});

export const ActressFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useState<ActressFilter>({});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <ActressFilterContext.Provider value={{ filter, setName }}>
      {children}
    </ActressFilterContext.Provider>
  );
};
