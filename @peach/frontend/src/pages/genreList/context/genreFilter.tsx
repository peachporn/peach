import { createContext, FunctionalComponent, h } from 'preact';
import { GenreFilter } from '@peach/types';
import { useState } from 'preact/hooks';

type GenreFilterContextType = {
  filter: GenreFilter;
  setName: (name: string) => void;
  setKinkiness: (kinkiness: number) => void;
};

export const GenreFilterContext = createContext<GenreFilterContextType>({
  filter: {},
  setName: () => {},
  setKinkiness: () => {},
});

export const GenreFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useState<GenreFilter>({});

  const setName = (name: string) => setFilter({ ...filter, name });
  const setKinkiness = (kinkiness: number) => setFilter({ ...filter, minKinkiness: kinkiness });

  return (
    <GenreFilterContext.Provider value={{ filter, setName, setKinkiness }}>
      {children}
    </GenreFilterContext.Provider>
  );
};
