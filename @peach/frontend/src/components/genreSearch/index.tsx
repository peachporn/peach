import { Fragment, FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import { GenreFilter, GenreSearchQuery, GenreSearchQueryVariables } from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { uniq } from 'ramda';
import { genreSearchQuery } from './genreSearchQuery.gql';
import { FetishBubble } from '../fetishBubble';

type GenreSearchProps = {
  onChange: (id: number[]) => unknown;
  filterOverride?: Partial<GenreFilter>;
  multiple?: boolean;
  placeholder?: string;
  defaultValue?: number[];
  inputClassName?: string;
  containerClassName?: string;
};

export const GenreSearch: FunctionalComponent<GenreSearchProps> = ({
  filterOverride,
  multiple = false,
  defaultValue,
  placeholder,
  onChange,
  containerClassName,
  inputClassName,
}) => {
  const [genreIds, setGenreIds] = useState<number[]>(defaultValue || []);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    onChange(genreIds);
  }, genreIds);

  const filter = {
    name: searchName,
    ...filterOverride,
  };

  const { data } = useQuery<GenreSearchQuery, GenreSearchQueryVariables>(genreSearchQuery, {
    variables: { filter, limit: 5 },
    skip: !genreIds.length && searchName.trim() === '',
  });

  return (
    <Fragment>
      <input
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        onKeyUp={event => setSearchName((event.target as HTMLInputElement)?.value)}
      />
      <div
        className={`grid grid-cols-5 md:grid-cols-3 mt-2 h-20 md:h-full items-center items-start text-center ${
          containerClassName || ''
        }`}
      >
        {uniqBy(g => g.id, data?.genres || []).map(g => (
          <FetishBubble
            className={genreIds.includes(g.id) ? '' : 'opacity-70'}
            onClick={() => {
              if (multiple) {
                setGenreIds(
                  genreIds.includes(g.id)
                    ? genreIds.filter(id => id !== g.id)
                    : uniq([...genreIds, g.id]),
                );
              } else {
                setGenreIds([g.id]);
              }
            }}
            genre={g}
          />
        ))}
      </div>
    </Fragment>
  );
};
