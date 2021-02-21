import { Fragment, FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import {
  WebsiteCardFragment,
  WebsiteFilter,
  WebsiteSearchQuery,
  WebsiteSearchQueryVariables,
} from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { ascend, descend, sortWith, uniq } from 'ramda';
import { websiteSearchQuery } from './websiteSearchQuery.gql';
import { FetishBubble } from '../fetishBubble';
import { WebsiteCard } from '../websiteCard';
import { Slider, SliderItem } from '../slider';

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
  }, websiteIds);

  const filter = {
    name: searchName,
    ...filterOverride,
  };

  const { data } = useQuery<WebsiteSearchQuery, WebsiteSearchQueryVariables>(websiteSearchQuery, {
    variables: { filter, limit: 6 },
    skip: !websiteIds.length && searchName.trim() === '',
  });

  return (
    <Fragment>
      <input
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        onKeyUp={event => setSearchName((event.target as HTMLInputElement)?.value)}
      />
      <div className={`mt-2 ${containerClassName || ''}`}>
        <Slider padding={0}>
          {uniqBy(
            w => w.id,
            sortWith<WebsiteCardFragment>(
              [descend(w => websiteIds.includes(w.id)), ascend(w => w.name)],
              data?.websites || [],
            ),
          ).map(w => (
            <SliderItem key={w.id}>
              <WebsiteCard
                className={`min-w-screen/2 ${websiteIds.includes(w.id) ? '' : 'opacity-70'}`}
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
