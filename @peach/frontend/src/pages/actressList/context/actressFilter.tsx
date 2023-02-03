import { ActressFilterInput } from '@peach/types';
import { createContext, FunctionalComponent, h } from 'preact';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type ActressFilterContextType = {
  filterInput: ActressFilterInput;
  setName: (name: string) => void;
};

export const ActressFilterContext = createContext<ActressFilterContextType>({
  filterInput: {},
  setName: () => {},
});

export const ActressFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<ActressFilterInput>('actressList-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });

  return (
    <ActressFilterContext.Provider value={{ filterInput: filter, setName }}>
      {children}
    </ActressFilterContext.Provider>
  );
};
