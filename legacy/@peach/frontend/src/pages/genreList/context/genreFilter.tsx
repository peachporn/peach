import { GenreFilterInput } from '@peach/types';
import { createContext, FunctionalComponent, h } from 'preact';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type GenreFilterContextType = {
  filterInput: GenreFilterInput;
  setName: (name: string) => void;
  setKinkiness: (kinkiness: number) => void;
};

export const GenreFilterContext = createContext<GenreFilterContextType>({
  filterInput: {},
  setName: () => {},
  setKinkiness: () => {},
});

export const GenreFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<GenreFilterInput>('genreList-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });
  const setKinkiness = (kinkiness: number) => setFilter({ ...filter, minKinkiness: kinkiness });

  return (
    <GenreFilterContext.Provider value={{ filterInput: filter, setName, setKinkiness }}>
      {children}
    </GenreFilterContext.Provider>
  );
};
