import { createContext, FunctionalComponent, h } from 'preact';
import { MovieFilter } from '@peach/types';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

type MovieFilterContextType = {
  filter: MovieFilter;
  isFiltered: boolean;
  setFetishes: (fetishes: number[]) => void;
  setActresses: (actresses: number[]) => void;
  setWebsites: (websites: number[]) => void;
  setTitle: (title: string) => void;
  setUntouched: (untouched: boolean | undefined) => void;
};

export const MovieFilterContext = createContext<MovieFilterContextType>({
  filter: {},
  isFiltered: false,
  setFetishes: () => {},
  setActresses: () => {},
  setWebsites: () => {},
  setTitle: () => {},
  setUntouched: () => {},
});

export const MovieFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<MovieFilter>('movieList-filter', {});

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
        filter: filterObject,
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