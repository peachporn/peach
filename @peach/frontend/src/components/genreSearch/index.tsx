import { Fragment, FunctionalComponent, h } from 'preact';
import uniqBy from 'ramda/es/uniqBy';
import { useEffect, useState } from 'preact/hooks';
import { useQuery } from '@apollo/client';
import {
  FetishBubbleFragment,
  GenreFilter,
  GenreSearchQuery,
  GenreSearchQueryVariables,
} from '@peach/types';
import { UseFormMethods } from 'react-hook-form';
import { uniq } from 'ramda';
import { genreSearchQuery } from './genreSearchQuery.gql';
import { FetishBubble } from '../fetishBubble';
import { websiteSearchQuery } from '../websiteSearch/websiteSearchQuery.gql';
import { debounce } from '../../utils/throttle';

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
  }, [genreIds]);

  const { data: selectedGenres } = useQuery<GenreSearchQuery, GenreSearchQueryVariables>(
    genreSearchQuery,
    {
      variables: { filter: { ids: genreIds }, limit: 5 },
      skip: !genreIds.length,
    },
  );

  const { data: searchedGenres } = useQuery<GenreSearchQuery, GenreSearchQueryVariables>(
    genreSearchQuery,
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

  const submitGenre = (g: FetishBubbleFragment) => {
    console.log(g);
    if (multiple) {
      setGenreIds(
        genreIds.includes(g.id) ? genreIds.filter(id => id !== g.id) : uniq([...genreIds, g.id]),
      );
    } else {
      setGenreIds([g.id]);
    }
    setSearchName('');
  };

  const genres = uniqBy(g => g.id, [
    ...(selectedGenres?.genres || []),
    ...(searchedGenres?.genres || []),
  ]);

  return (
    <Fragment>
      <input
        tabIndex={0}
        className={`input ${inputClassName || ''}`}
        placeholder={placeholder}
        value={searchName}
        onKeyUp={debounce((event: KeyboardEvent) => {
          if (event.key === 'Enter' && searchedGenres?.genres.length === 1) {
            submitGenre(searchedGenres.genres[0]);
            return;
          }
          setSearchName((event.target as HTMLInputElement)?.value);
        }, 200)}
      />
      <div
        className={`flex gap-4 mt-2 h-20 md:h-full items-center text-center ${
          containerClassName || ''
        }`}
      >
        {genres.map(g => (
          <FetishBubble
            key={g.id}
            className={genreIds.includes(g.id) ? '' : 'opacity-70'}
            onClick={() => {
              submitGenre(g);
            }}
            genre={g}
          />
        ))}
      </div>
    </Fragment>
  );
};
