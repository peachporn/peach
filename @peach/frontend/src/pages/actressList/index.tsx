import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { ActressesCountQuery, ActressesListQuery, ActressesListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { usePagination } from '../../utils/usePagination';
import { actressesCountQuery, actressesListQuery } from './queries/actressesList.gql';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { ActressFilterContext, ActressFilterProvider } from './context/actressFilter';
import { ActressFilter } from './components/actressFilter';
import { CreateActressForm } from './components/createActressForm';

const pageLength = 48;

const ActressesPageComponent: FunctionalComponent = () => {
  const { filter } = useContext(ActressFilterContext);
  const count = useQuery<ActressesCountQuery>(actressesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <span>loading</span>;
  }

  const { limit, skip } = usePagination({
    pageLength: count.data.actressesCount,
    maxItems: count.data.actressesCount,
  });

  const { refetch, loading, data } = useQuery<ActressesListQuery, ActressesListQueryVariables>(
    actressesListQuery,
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
        {i('NAVIGATION_ACTRESSES')}
      </h1>
      <section className="bg-white p-8 min-h-screen shadow-lg">
        <ActressFilter />
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2">{(data?.actresses || []).map(a => a.name)}</div>
        )}
      </section>
      <CreateActressForm onSubmit={count.refetch} />
    </main>
  );
};

export const ActressesPage = () => (
  <ActressFilterProvider>
    <ActressesPageComponent />
  </ActressFilterProvider>
);
