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
import { pascalCase, spaceCase } from 'case-anything';
import { actressSearchQuery } from './actressSearchQuery.gql';
import { FetishBubble } from '../fetishBubble';
import { Slider, SliderItem } from '../slider';
import { ActressCard } from '../actressCard';
import { CreateActressForm } from './createActressForm';
import { debounce, throttle } from '../../utils/throttle';
import { Icon } from '../icon';

type ActressSearchProps = {
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<ActressFilter>;
  multiple?: boolean;
  placeholder?: string;
  defaultValue?: number[];
  setValue?: number[];
  setSearchName?: string;
  limit?: number;
  inputClassName?: string;
  containerClassName?: string;
  sliderClassName?: string;
};

export const ActressSearch: FunctionalComponent<ActressSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  setValue,
  setSearchName: setSearchNameProp,
  placeholder,
  onChange,
  containerClassName,
  limit,
  inputClassName,
  sliderClassName,
}) => {
  const [actressIds, setActressIds] = useState<number[]>(defaultValue || []);
  const [createActressFormVisible, setCreateActressFormVisible] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    if (!setValue) return;
    setActressIds(setValue);
  }, [setValue]);

  useEffect(() => {
    if (!setSearchNameProp) return;
    setSearchName(setSearchNameProp);
  }, [setSearchNameProp]);

  useEffect(() => {
    onChange(actressIds);
  }, [actressIds]);

  const { data: selectedActresses } = useQuery<ActressSearchQuery, ActressSearchQueryVariables>(
    actressSearchQuery,
    {
      variables: { filter: { ids: actressIds }, limit: 100 },
      skip: !actressIds.length,
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
        limit: limit || 5,
      },
      skip: searchName.trim() === '',
    },
  );

  const actresses = [
    ...(selectedActresses?.actresses || []),
    ...(searchedActresses?.actresses || []),
  ];

  const submitActress = (a: ActressCardFragment) => {
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
  };

  return (
    <div className="relative">
      <input
        tabIndex={0}
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        value={searchName}
        onKeyUp={debounce((event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            if (searchedActresses?.actresses.length === 1) {
              submitActress(searchedActresses.actresses[0]);
              return;
            }
            if (searchedActresses?.actresses.length === 0) {
              setCreateActressFormVisible(true);
              return;
            }
          }
          setSearchName((event.target as HTMLInputElement)?.value);
        }, 200)}
      />
      <button
        className="absolute top-1 right-1 text-gray-500"
        onClick={() => {
          setSearchName(searchName.includes(' ') ? pascalCase(searchName) : spaceCase(searchName));
        }}
      >
        <Icon icon="space_bar" />
      </button>
      <div className={`min-h-screen/2 mt-2 ${containerClassName || ''}`}>
        {searchName !== '' && searchedActresses?.actresses.length === 0 ? (
          <CreateActressForm
            visibility={[createActressFormVisible, setCreateActressFormVisible]}
            name={searchName}
            onSubmit={actressId => {
              if (!actressId) return;
              setActressIds([...actressIds, actressId]);
              setSearchName('');
            }}
          />
        ) : null}
        <Slider className={sliderClassName} padding={0}>
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
                  className={`h-full max-w-screen/2 min-w-screen/2 md:min-w-0 ${
                    actressIds.includes(a.id) ? '' : 'opacity-70'
                  }`}
                  onClick={() => {
                    submitActress(a);
                  }}
                  actress={a}
                />
              </SliderItem>
            ))}
        </Slider>
      </div>
    </div>
  );
};
