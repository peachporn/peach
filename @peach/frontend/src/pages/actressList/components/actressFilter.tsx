import { useQuery } from '@apollo/client';
import { ActressFiltersQuery, ActressFiltersQueryVariables } from '@peach/types';
import { FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { debounce } from '../../../utils/throttle';
import { ActressFilterContext } from '../context/actressFilter';
import { actressFiltersQuery } from '../queries/actressFilters.gql';
import { ActressFilterCard } from './actressFilterCard';

export const ActressFilter: FunctionalComponent = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(true);
  const { filterInput } = useContext(ActressFilterContext);

  useEffect(() => {
    setQuery('');
    setFocused(false);
  }, [filterInput]);

  const { data: filtersData } = useQuery<ActressFiltersQuery, ActressFiltersQueryVariables>(
    actressFiltersQuery,
    {
      variables: {
        query,
      },
    },
  );
  const noFiltersSelected = !filterInput.name && !filterInput.equipment;

  const debouncedSetQuery = debounce((e: Event) => {
    setQuery((e.target as HTMLInputElement).value);
  }, 250);

  return (
    <div className={`bg-white shadow w-full px-8 pt-4`}>
      <div>
        <div className="place-items-center flex rounded-full p-2 focus:outline-none bg-gray-50 relative">
          <input
            className="input border-b-0 bg-gray-50 w-full"
            placeholder={i('ACTRESS_FILTER_INPUT')}
            value={query}
            onFocus={() => {
              setFocused(true);
            }}
            onKeyUp={(e: KeyboardEvent) => debouncedSetQuery(e)}
          />
          <div className="absolute bottom-1.5 right-2 text-gray-500">
            {!focused ? null : (
              <Icon
                icon={'close'}
                onClick={() => {
                  setFocused(false);
                }}
              />
            )}
          </div>
        </div>
        {!focused ? null : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full p-4 min-h-32">
            {filtersData?.actressFilters.map(filter => (
              <ActressFilterCard actressFilter={filter} />
            ))}
          </div>
        )}
        {noFiltersSelected ? null : (
          <div className="col-span-12 grid grid-cols-3 md:grid-cols-8 gap-4 px-4 py-2 text-xs">
            {!filterInput.name ? null : (
              <div className={'col-span-4 md:col-span-1 grid grid-cols-1'}>
                <ActressFilterCard
                  actressFilter={{ __typename: 'NameActressFilter', name: filterInput.name }}
                />
              </div>
            )}
            {!filterInput.equipment ? null : (
              <div className={'col-span-4 md:col-span-1 grid grid-cols-1'}>
                <ActressFilterCard
                  actressFilter={{
                    __typename: 'EquipmentActressFilter',
                    type: filterInput.equipment.type,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
