import { MovieFilterInput } from '@peach/types';
import { createContext, FunctionalComponent, h } from 'preact';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

type MovieFilterContextType = {
  filterInput: MovieFilterInput;
  isFiltered: boolean;
  setFetishes: (fetishes: number[]) => void;
  setActresses: (actresses: number[]) => void;
  setWebsites: (websites: number[]) => void;
  setTitle: (title: string) => void;
  setUntouched: (untouched: boolean | undefined) => void;
};

export const MovieFilterContext = createContext<MovieFilterContextType>({
  filterInput: {},
  isFiltered: false,
  setFetishes: () => {},
  setActresses: () => {},
  setWebsites: () => {},
  setTitle: () => {},
  setUntouched: () => {},
});

export const MovieFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<MovieFilterInput>('movieList-filter', {});

  const setFetishes = (fetishes: number[]) => setFilter({ ...filter, fetishes });
  const setActresses = (actresses: number[]) => setFilter({ ...filter, actresses });
  const setWebsites = (websites: number[]) => setFilter({ ...filter, websites });
  const setTitle = (title: string) => setFilter({ ...filter, title });
  const setUntouched = (untouched: boolean | undefined) => setFilter({ ...filter, untouched });

  const filterObject = {
    title: filter.title || undefined,
    actresses: filter.actresses?.length ? filter.actresses : undefined,
    websites: filter.websites?.length ? filter.websites : undefined,
    fetishes: filter.fetishes?.length ? filter.fetishes : undefined,
    untouched: filter.untouched,
  };

  return (
    <MovieFilterContext.Provider
      value={{
        filterInput: filterObject,
        isFiltered: Object.values(filterObject).filter(v => v !== undefined).length !== 0,
        setTitle,
        setActresses,
        setWebsites,
        setFetishes,
        setUntouched,
      }}
    >
      {children}
    </MovieFilterContext.Provider>
  );
};
