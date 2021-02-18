import { createContext, FunctionalComponent, h } from 'preact';
import { MovieFilter } from '@peach/types';
import { useState } from 'preact/hooks';

type MovieFilterContextType = {
  filter: MovieFilter;
  setFetishes: (fetishes: number[]) => void;
};

export const MovieFilterContext = createContext<MovieFilterContextType>({
  filter: {},
  setFetishes: () => {},
});

export const MovieFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useState<MovieFilter>({});

  const setFetishes = (fetishes: number[]) => setFilter({ ...filter, fetishes });

  return (
    <MovieFilterContext.Provider
      value={{
        filter: {
          fetishes: filter.fetishes?.length ? filter.fetishes : undefined,
        },
        setFetishes,
      }}
    >
      {children}
    </MovieFilterContext.Provider>
  );
};
