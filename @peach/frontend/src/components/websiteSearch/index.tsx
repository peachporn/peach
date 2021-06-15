import { FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { pascalCase, spaceCase } from 'case-anything';
import {
  WebsiteCardFragment,
  WebsiteFilter,
  WebsiteSearchQuery,
  WebsiteSearchQueryVariables,
} from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { equals, sortWith, uniq } from 'ramda';
import { FetishBubble } from '../fetishBubble';
import { WebsiteCard } from '../websiteCard';
import { Slider, SliderItem } from '../slider';
import { actressSearchQuery } from '../actressSearch/actressSearchQuery.gql';
import { websiteSearchQuery } from './websiteSearchQuery.gql';
import { debounce } from '../../utils/throttle';
import { CreateWebsiteForm } from './createWebsiteForm';
import { Icon } from '../icon';
import { usePrevious } from '../../utils/usePrevious';

type WebsiteSearchProps = {
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<WebsiteFilter>;
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

export const WebsiteSearch: FunctionalComponent<WebsiteSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  setValue,
  setSearchName: setSearchNameProp,
  placeholder,
  onChange,
  limit,
  containerClassName,
  inputClassName,
  sliderClassName,
}) => {
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
    onChange(websiteIds);
  }, [websiteIds]);

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

  const websites = uniqBy(w => w.id, [
    ...(selectedWebsites?.websites || []),
    ...(searchedWebsites?.websites || []),
  ]);

  const submitWebsite = (w: WebsiteCardFragment) => {
    if (multiple) {
      setWebsiteIds(
        websiteIds.includes(w.id)
          ? websiteIds.filter(id => id !== w.id)
          : uniq([...websiteIds, w.id]),
      );
    } else {
      setWebsiteIds([w.id]);
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
            if (searchedWebsites?.websites.length === 1) {
              submitWebsite(searchedWebsites?.websites[0]);
              return;
            }
            if (searchedWebsites?.websites.length === 0) {
              setCreateWebsiteFormVisible(true);
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
      <div className={`mt-2 ${containerClassName || ''}`}>
        {searchName !== '' && searchedWebsites?.websites.length === 0 ? (
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
