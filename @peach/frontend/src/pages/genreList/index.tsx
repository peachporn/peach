import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { GenresCountQuery, GenresListQuery, GenresListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { usePagination } from '../../utils/usePagination';
import { genresCountQuery, genresListQuery } from './queries/genreList.gql';
import { CreateGenreForm } from './components/createGenreForm';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { GenreGridByCategory } from './components/genreGridByCategory';
import { GenreFilterContext, GenreFilterProvider } from './context/genreFilter';
import { GenreFilter } from './components/genreFilter';

const GenresPageComponent: FunctionalComponent = () => {
  const { filter } = useContext(GenreFilterContext);
  const count = useQuery<GenresCountQuery>(genresCountQuery);

  if (count.loading || count.error || !count.data) {
    return <span>loading</span>;
  }

  const pagination = usePagination({
    pageLength: count.data.genresCount,
    maxItems: count.data.genresCount,
  });
  const { limit, skip } = pagination;

  const { refetch, loading, data } = useQuery<GenresListQuery, GenresListQueryVariables>(
    genresListQuery,
    {
      variables: {
        filter,
        limit,
        skip,
      },
    },
  );

  return (
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
            <GenreGridByCategory genres={data?.genres || []} />
          </Fragment>
        )}
      </section>
      <CreateGenreForm onSubmit={count.refetch} />
    </main>
  );
};

export const GenresPage = () => (
  <GenreFilterProvider>
    <GenresPageComponent />
  </GenreFilterProvider>
);
