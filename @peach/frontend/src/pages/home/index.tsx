import { useQuery } from '@apollo/client';

import { HomepageQuery, PinnedFetishesQuery, PinnedFetishesQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/icon';
import { MovieFilterContext } from '../../context/movieFilter';
import { i } from '../../i18n/i18n';
import { moviesRoute, settingsRoute } from '../../utils/route';
import { MovieCardSlider } from './components/movieCardSlider';
import { NoVolumesHint } from './components/noVolumesHint';
import { homepageQuery } from './queries/homepage.gql';
import { pinnedFetishesQuery } from './queries/pinnedFetishes.gql';

export const Homepage: FunctionalComponent = () => {
  const { setUntouched } = useContext(MovieFilterContext);
  const { data, loading } = useQuery<HomepageQuery>(homepageQuery);

  const movie = data?.randomMovies?.movies[0];
  const hasMovies = data?.recentMovies.movies.length || data?.randomMovies.movies.length;

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
          {data && (
            <Fragment>
              <span className="block m-auto text-center text-white text-xs">
                {i('SERVING_X_MOVIES', { count: `${data?.movieCount.all || ''}` })}
              </span>
              <Link
                to={moviesRoute}
                className="block m-auto text-center text-white text-2xs"
                onClick={() => {
                  setUntouched(true);
                }}
              >
                {i('COUNT_UNTOUCHED', { count: `${data?.movieCount.untouched || ''}` })}
              </Link>
            </Fragment>
          )}
          <Link to={settingsRoute}>
            <Icon className="text-white absolute right-3 top-3" icon="settings" />
          </Link>
        </div>
        <div className="bg-white px-8 py-8 shadow-lg">
          {!loading && !hasMovies ? (
            <NoVolumesHint />
          ) : (
            <Fragment>
              <MovieCardSlider movies={fetishMovies?.movies.movies || []} headline={i('PINNED')} />
              <MovieCardSlider
                movies={data?.randomMovies.movies || []}
                headline={i('RANDOM_MOVIES')}
              />
              <MovieCardSlider
                movies={data?.recentMovies.movies || []}
                headline={i('RECENT_MOVIES')}
              />
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
