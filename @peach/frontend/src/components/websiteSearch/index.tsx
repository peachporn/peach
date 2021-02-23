import { Fragment, FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { WebsiteFilter, WebsiteSearchQuery, WebsiteSearchQueryVariables } from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { sortWith, uniq } from 'ramda';
import { FetishBubble } from '../fetishBubble';
import { WebsiteCard } from '../websiteCard';
import { Slider, SliderItem } from '../slider';
import { actressSearchQuery } from '../actressSearch/actressSearchQuery.gql';
import { websiteSearchQuery } from './websiteSearchQuery.gql';

type WebsiteSearchProps = {
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<WebsiteFilter>;
  multiple?: boolean;
  placeholder?: string;
  defaultValue?: number[];
  inputClassName?: string;
  containerClassName?: string;
};

export const WebsiteSearch: FunctionalComponent<WebsiteSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  placeholder,
  onChange,
  containerClassName,
  inputClassName,
}) => {
  const [websiteIds, setWebsiteIds] = useState<number[]>(defaultValue || []);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    onChange(websiteIds);
  }, [websiteIds]);

  const { data: selectedWebsites } = useQuery<WebsiteSearchQuery, WebsiteSearchQueryVariables>(
    websiteSearchQuery,
    {
      variables: { filter: { ids: websiteIds }, limit: 5 },
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
        limit: 5,
      },
      skip: searchName.trim() === '',
    },
  );

  const websites = [...(selectedWebsites?.websites || []), ...(searchedWebsites?.websites || [])];

  return (
    <Fragment>
      <input
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        onKeyUp={event => setSearchName((event.target as HTMLInputElement)?.value)}
      />
      <div className={`mt-2 ${containerClassName || ''}`}>
        <Slider className="md:grid-cols-3" padding={0}>
          {uniqBy(w => w.id, websites || []).map(w => (
            <SliderItem key={w.id}>
              <WebsiteCard
                className={`min-w-screen/2 md:min-w-0 ${
                  websiteIds.includes(w.id) ? '' : 'opacity-70'
                }`}
                onClick={() => {
                  if (multiple) {
                    setWebsiteIds(
                      websiteIds.includes(w.id)
                        ? websiteIds.filter(id => id !== w.id)
                        : uniq([...websiteIds, w.id]),
                    );
                  } else {
                    setWebsiteIds([w.id]);
                  }
                }}
                website={w}
              />
            </SliderItem>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};
