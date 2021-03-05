import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { HomepageQuery, PinnedFetishesQuery, PinnedFetishesQueryVariables } from '@peach/types';
import { Helmet } from 'react-helmet';
import { homepageQuery } from './queries/homepage.gql';
import { i } from '../../i18n/i18n';
import { NoVolumesHint } from './components/noVolumesHint';
import { Icon } from '../../components/icon';
import { settingsRoute } from '../../utils/route';
import { MovieCardSlider } from './components/movieCardSlider';
import { pinnedFetishesQuery } from './queries/pinnedFetishes.gql';

export const Homepage: FunctionalComponent = () => {
  const { data, loading } = useQuery<HomepageQuery>(homepageQuery);

  const movie = data?.randomMovies[0];
  const hasMovies = data?.recentMovies.length || data?.randomMovies.length;

  const { data: fetishMovies } = useQuery<PinnedFetishesQuery, PinnedFetishesQueryVariables>(
    pinnedFetishesQuery,
    {
      variables: {
        fetishIds: data?.settings.pinnedFetishes.map(f => f.id) || [],
      },
      skip: !data?.settings.pinnedFetishes.length,
    },
  );

  return (
    <Fragment>
      <Helmet>
        <title>{i('PAGE_TITLE_HOME')}</title>
      </Helmet>
      <main className="pb-12 min-h-screen">
        <div className="pt-24 pb-8 min-h-screen/2">
          <img className="m-auto rounded-full shadow-lg" alt="Peach Logo" src="/logo.png" />
          <h1 className="text-center m-auto text-white font-display text-5xl">Peach</h1>
          <Link to={settingsRoute}>
            <Icon className="text-white absolute right-3 top-3" icon="settings" />
          </Link>
        </div>
        <div className="bg-white px-8 py-8 shadow-lg">
          {!loading && !hasMovies ? (
            <NoVolumesHint />
          ) : (
            <Fragment>
              <MovieCardSlider movies={fetishMovies?.movies || []} headline={i('PINNED')} />
              <MovieCardSlider movies={data?.randomMovies || []} headline={i('RANDOM_MOVIES')} />
              <MovieCardSlider movies={data?.recentMovies || []} headline={i('RECENT_MOVIES')} />
            </Fragment>
          )}
        </div>
        {!movie || !movie.coverPicture ? null : (
          <img
            className="absolute inset-0 blend-multiply filter-grayscale w-full -z-1 opacity-50 min-h-screen/2 max-h-full object-cover"
            src={movie.coverPicture?.src}
            alt={movie.title}
          />
        )}
      </main>
    </Fragment>
  );
};
