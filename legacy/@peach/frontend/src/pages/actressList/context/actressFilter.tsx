import { ActressFilterInput, EquipmentInputType } from '@peach/types';
import { createContext, FunctionalComponent } from 'preact';
import { useLocalStorageState } from '../../../hooks/useLocalStorageState';

type ActressFilterContextType = {
  filterInput: ActressFilterInput;
  setName: (name: string | undefined) => void;
  setEquipment: (equipment: EquipmentInputType | undefined) => void;
};

export const ActressFilterContext = createContext<ActressFilterContextType>({
  filterInput: {},
  setName: () => {},
  setEquipment: () => {},
});

export const ActressFilterProvider: FunctionalComponent = ({ children }) => {
  const [filter, setFilter] = useLocalStorageState<ActressFilterInput>('actressList-filter', {});

  const setName = (name: string) => setFilter({ ...filter, name });

  const setEquipment = (equipment: EquipmentInputType | undefined) =>
    setFilter({
      ...filter,
      equipment: !equipment ? undefined : { type: equipment },
    });

  return (
    <ActressFilterContext.Provider value={{ filterInput: filter, setName, setEquipment }}>
      {children}
    </ActressFilterContext.Provider>
  );
};
