import { Fragment, FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import {
  ActressCardFragment,
  ActressFilter,
  ActressSearchQuery,
  ActressSearchQueryVariables,
} from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { ascend, descend, sortWith, uniq } from 'ramda';
import { actressSearchQuery } from './actressSearchQuery.gql';
import { FetishBubble } from '../fetishBubble';
import { Slider, SliderItem } from '../slider';
import { ActressCard } from '../actressCard';
import { CreateActressForm } from './createActressForm';

type ActressSearchProps = {
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<ActressFilter>;
  multiple?: boolean;
  placeholder?: string;
  defaultValue?: number[];
  inputClassName?: string;
  containerClassName?: string;
};

export const ActressSearch: FunctionalComponent<ActressSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  placeholder,
  onChange,
  containerClassName,
  inputClassName,
}) => {
  const [actressIds, setActressIds] = useState<number[]>(defaultValue || []);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    onChange(actressIds);
  }, actressIds);

  const { data: selectedActresses } = useQuery<ActressSearchQuery, ActressSearchQueryVariables>(
    actressSearchQuery,
    {
      variables: { filter: { ids: actressIds }, limit: 5 },
      skip: !actressIds.length && searchName.trim() === '',
    },
  );

  const { data: searchedActresses } = useQuery<ActressSearchQuery, ActressSearchQueryVariables>(
    actressSearchQuery,
    {
      variables: {
        filter: {
          name: searchName,
          ...filterOverride,
        },
        limit: 5,
      },
      skip: !actressIds.length && searchName.trim() === '',
    },
  );

  const actresses = [
    ...(searchName === '' ? selectedActresses?.actresses || [] : []),
    ...(searchedActresses?.actresses || []),
  ];

  return (
    <Fragment>
      <input
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        value={searchName}
        onKeyUp={event => setSearchName((event.target as HTMLInputElement)?.value)}
      />
      <div className={`min-h-screen/2 mt-2 ${containerClassName || ''}`}>
        {searchName !== '' && searchedActresses?.actresses.length === 0 ? (
          <CreateActressForm
            name={searchName}
            onSubmit={actressId => {
              if (!actressId) return;
              setActressIds([...actressIds, actressId]);
              setSearchName('');
            }}
          />
        ) : null}
        <Slider padding={0}>
          {uniqBy(
            a => a.id,
            sortWith<ActressCardFragment>(
              [descend(a => actressIds.includes(a.id)), ascend(a => a.name)],
              actresses,
            ),
          )
            .filter(a => (searchName === '' ? actressIds.includes(a.id) : true))
            .map(a => (
              <SliderItem key={a.id}>
                <ActressCard
                  className={`h-full max-w-screen/2 min-w-screen/2 md:min-w-0 md:w-64 ${
                    actressIds.includes(a.id) ? '' : 'opacity-70'
                  }`}
                  onClick={() => {
                    if (multiple) {
                      setActressIds(
                        actressIds.includes(a.id)
                          ? actressIds.filter(id => id !== a.id)
                          : uniq([...actressIds, a.id]),
                      );
                    } else {
                      setActressIds([a.id]);
                    }
                    setSearchName('');
                  }}
                  actress={a}
                />
              </SliderItem>
            ))}
        </Slider>
      </div>
    </Fragment>
  );
};
