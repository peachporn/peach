import { useQuery } from '@apollo/client';
import {
  WebsiteCardFragment,
  WebsiteFilterInput,
  WebsiteSearchQuery,
  WebsiteSearchQueryVariables,
} from '@peach/types';
import { pascalCase, spaceCase } from 'case-anything';
import { FunctionalComponent, h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { equals, uniq } from 'ramda';
import uniqBy from 'ramda/es/uniqBy';
import { debounce } from '../../utils/throttle';
import { usePrevious } from '../../utils/usePrevious';
import { Icon } from '../icon';
import { Slider, SliderItem } from '../slider';
import { WebsiteCard } from '../websiteCard';
import { CreateWebsiteForm } from './createWebsiteForm';
import { websiteSearchQuery } from './websiteSearchQuery.gql';

type WebsiteSearchProps = {
  onChange: (id: number[], fetishIds: number[]) => unknown;
  filterOverride?: Partial<WebsiteFilterInput>;
  multiple?: boolean;
  placeholder?: string;
  defaultValue?: number[];
  setValue?: number[];
  setSearchName?: string;
  limit?: number;
  controlsSlot?: VNode;
  inputClassName?: string;
  containerClassName?: string;
  sliderClassName?: string;
};

export const WebsiteSearch: FunctionalComponent<WebsiteSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  setValue,
  setSearchName: setSearchNameProp,
  placeholder,
  onChange,
  limit,
  controlsSlot,
  containerClassName,
  inputClassName,
  sliderClassName,
}) => {
  const [fetishIds, setFetishIds] = useState<number[]>([]);
  const [websiteIds, setWebsiteIds] = useState<number[]>(defaultValue || []);
  const [createWebsiteFormVisible, setCreateWebsiteFormVisible] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');

  const previousSetValue = usePrevious(setValue);

  useEffect(() => {
    if (!setValue || equals(setValue, previousSetValue)) return;
    if (setValue.find(v => !websiteIds.includes(v))) {
      setWebsiteIds(setValue);
    }
  }, [setValue]);

  useEffect(() => {
    if (!setSearchNameProp) return;
    setSearchName(setSearchNameProp);
  }, [setSearchNameProp]);

  useEffect(() => {
    onChange(websiteIds, fetishIds);
  }, [websiteIds, fetishIds]);

  const { data: selectedWebsites } = useQuery<WebsiteSearchQuery, WebsiteSearchQueryVariables>(
    websiteSearchQuery,
    {
      variables: { filter: { ids: websiteIds }, limit: 100 },
      skip: !websiteIds.length,
    },
  );

  const { data: searchedWebsites } = useQuery<WebsiteSearchQuery, WebsiteSearchQueryVariables>(
    websiteSearchQuery,
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

  const websites = uniqBy(
    w => w.id,
    [
      ...(selectedWebsites?.websites?.websites || []),
      ...(searchedWebsites?.websites?.websites || []),
    ],
  );

  const submitWebsite = (w: WebsiteCardFragment) => {
    setWebsiteIds(
      websiteIds.includes(w.id)
        ? websiteIds.filter(id => id !== w.id)
        : uniq([...(multiple ? websiteIds : []), w.id]),
    );
    if (w.fetish?.id) {
      setFetishIds(
        fetishIds.includes(w.fetish.id)
          ? fetishIds.filter(id => id !== w.fetish!.id)
          : uniq([...(multiple ? fetishIds : []), w.fetish.id]),
      );
    }
    setSearchName('');
  };

  return (
    <div className="relative">
      <input
        className={`input ${inputClassName || ''}`}
        value={searchName}
        placeholder={placeholder}
        onKeyUp={debounce((event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            if (searchedWebsites?.websites.websites.length === 1) {
              submitWebsite(searchedWebsites?.websites?.websites[0]);
              return;
            }
            if (searchedWebsites?.websites.websites.length === 0) {
              setCreateWebsiteFormVisible(true);
              return;
            }
          }
          setSearchName((event.target as HTMLInputElement)?.value);
        }, 200)}
      />
      <div className="absolute top-1 right-1 text-gray-500">
        {controlsSlot}
        <button
          onClick={() => {
            setSearchName(
              searchName.includes(' ') ? pascalCase(searchName) : spaceCase(searchName),
            );
          }}
        >
          <Icon icon="space_bar" />
        </button>
      </div>
      <div className={`mt-2 ${containerClassName || ''}`}>
        {searchName !== '' && searchedWebsites?.websites.websites.length === 0 ? (
          <CreateWebsiteForm
            name={searchName}
            visibility={[createWebsiteFormVisible, setCreateWebsiteFormVisible]}
            onSubmit={websiteId => {
              if (!websiteId) return;
              setWebsiteIds([...websiteIds, websiteId]);
              setSearchName('');
            }}
          />
        ) : null}
        <Slider className={`${sliderClassName}`} padding={0}>
          {websites.map(w => (
            <SliderItem key={w.id}>
              <WebsiteCard
                className={`w-screen/2 md:min-w-0 ${websiteIds.includes(w.id) ? '' : 'opacity-70'}`}
                onClick={() => {
                  submitWebsite(w);
                }}
                website={w}
              />
            </SliderItem>
          ))}
        </Slider>
      </div>
    </div>
  );
};
