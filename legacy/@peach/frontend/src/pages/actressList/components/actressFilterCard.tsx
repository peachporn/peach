import {
  ActressFilter_EquipmentActressFilter_Fragment,
  ActressFilter_NameActressFilter_Fragment,
  ActressFilterFragment,
} from '@peach/types';
import { FunctionalComponent } from 'preact';
import { FC } from 'preact/compat';
import { useContext } from 'preact/hooks';
import { FilterCard } from '../../../components/filterCard';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { ActressFilterContext } from '../context/actressFilter';

const EquipmentFilterCard: FC<{ actressFilter: ActressFilter_EquipmentActressFilter_Fragment }> = ({
  actressFilter,
}) => {
  const { filterInput, setEquipment } = useContext(ActressFilterContext);

  return (
    <FilterCard
      onClick={() => {
        setEquipment(filterInput.equipment?.type ? undefined : actressFilter.type);
      }}
      descriptionSlot={<>{i('ACTRESS_EQUIPMENT')}</>}
      iconSlot={<Icon className={'text-md text-pink'} icon={'accessibility_new'} />}
    >
      {actressFilter.type}
    </FilterCard>
  );
};

const NameFilterCard: FC<{ actressFilter: ActressFilter_NameActressFilter_Fragment }> = ({
  actressFilter,
}) => {
  const { filterInput, setName } = useContext(ActressFilterContext);

  return (
    <FilterCard
      onClick={() => {
        if (filterInput.name) {
          return setName(undefined);
        }
        setName(actressFilter.name);
      }}
      descriptionSlot={<>{i('ACTRESS_FILTER_NAME')}</>}
      iconSlot={<Icon className={'text-md text-pink'} icon={'person_pin'} />}
    >
      {actressFilter.name}
    </FilterCard>
  );
};

type ActressFilterCardProps = {
  actressFilter: ActressFilterFragment;
};

export const ActressFilterCard: FunctionalComponent<ActressFilterCardProps> = ({ actressFilter }) =>
  actressFilter.__typename === 'NameActressFilter' ? (
    <NameFilterCard actressFilter={actressFilter} />
  ) : actressFilter.__typename === 'EquipmentActressFilter' ? (
    <EquipmentFilterCard actressFilter={actressFilter} />
  ) : null;
