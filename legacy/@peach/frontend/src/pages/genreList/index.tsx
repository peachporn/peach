import { useQuery } from '@apollo/client';
import { GenreCountQuery, GenreListQuery, GenreListQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/loading';
import { i } from '../../i18n/i18n';
import { usePagination } from '../../utils/usePagination';
import { CreateGenreFloatingButton } from './components/createGenreFloatingButton';
import { GenreFilter } from './components/genreFilter';
import { GenreGridByCategory } from './components/genreGridByCategory';
import { GenreFilterContext, GenreFilterProvider } from './context/genreFilter';
import { genreCountQuery } from './queries/genreCount.gql';
import { genreListQuery } from './queries/genreList.gql';

const GenresPageComponent: FunctionalComponent = () => {
  const { filterInput } = useContext(GenreFilterContext);
  const count = useQuery<GenreCountQuery>(genreCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength: count.data.genreCount,
    maxItems: count.data.genreCount,
  });
  const { limit, skip } = pagination;

  const { refetch, loading, data } = useQuery<GenreListQuery, GenreListQueryVariables>(
    genreListQuery,
    {
      variables: {
        filter: filterInput,
        limit,
        skip,
      },
    },
  );

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_GENRES')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
          {i('NAVIGATION_GENRES')}
        </h1>
        <GenreFilter />
        <section className="bg-white p-8 min-h-screen shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              <GenreGridByCategory genres={data?.genres.genres || []} />
            </Fragment>
          )}
        </section>
        <CreateGenreFloatingButton onSubmit={count.refetch} />
      </main>
    </Fragment>
  );
};

export const GenresPage = () => (
  <GenreFilterProvider>
    <GenresPageComponent />
  </GenreFilterProvider>
);
