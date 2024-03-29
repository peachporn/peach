import { useQuery } from '@apollo/client';
import {
  ActressSearchQuery,
  ActressSearchQueryVariables,
  WebsiteSearchQuery,
  WebsiteSearchQueryVariables,
} from '@peach/types';
import { Fragment, h } from 'preact';
import { head } from 'ramda';
import { actressSearchQuery } from '../../../components/actressSearch/actressSearchQuery.gql';
import { Icon } from '../../../components/icon';
import { websiteSearchQuery } from '../../../components/websiteSearch/websiteSearchQuery.gql';
import { useMovieFormContext } from '../context/movieForm';

export const TitleSearchButtons = () => {
  const { actressIds, websiteId, setTitle } = useMovieFormContext();

  const { data: selectedActresses } = useQuery<ActressSearchQuery, ActressSearchQueryVariables>(
    actressSearchQuery,
    {
      variables: { filter: { ids: actressIds }, limit: 100 },
      skip: !actressIds.length,
    },
  );

  const { data: selectedWebsites } = useQuery<WebsiteSearchQuery, WebsiteSearchQueryVariables>(
    websiteSearchQuery,
    {
      variables: { filter: { ids: [websiteId!] }, limit: 100 },
      skip: !websiteId,
    },
  );

  const url =
    !selectedWebsites || !selectedActresses
      ? null
      : `https://google.com/search?q=${head(selectedActresses.actresses.actresses)?.name} site:${
          head(selectedWebsites.websites.websites)?.url
        }`;

  const setFallbackTitle = () => {
    setTitle(
      `${(selectedActresses?.actresses.actresses ?? []).map(a => a.name).join(' ')} ${(
        selectedWebsites?.websites.websites ?? []
      )
        .map(w => w.name)
        .join(' ')}`,
    );
  };

  return !url ? null : (
    <Fragment>
      <button className="mr-2 text-center" onClick={setFallbackTitle}>
        <Icon
          className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="subtitles"
        />
      </button>
      <a className="mr-2 text-center" href={url} target="_blank">
        <Icon
          className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="search"
        />
      </a>
    </Fragment>
  );
};
