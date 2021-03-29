import { createContext, FunctionalComponent, h } from 'preact';
import { ActressFilter } from '@peach/types';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type ActressFilterContextType = {
  filter: ActressFilter;
  setName: (name: string) => void;
};

export const ActressFilterContext = createContext<ActressFilterContextType>({
  filter: {},
  setName: () => {},
});

export const ActressFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<ActressFilter>('actresslist-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <ActressFilterContext.Provider value={{ filter, setName }}>
      {children}
    </ActressFilterContext.Provider>
  );
};
