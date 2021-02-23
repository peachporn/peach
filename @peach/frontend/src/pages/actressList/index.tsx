import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { ActressesCountQuery, ActressesListQuery, ActressesListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { usePagination } from '../../utils/usePagination';
import { actressesCountQuery, actressesListQuery } from './queries/actressesList.gql';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { ActressFilterContext, ActressFilterProvider } from './context/actressFilter';
import { ActressFilter } from './components/actressFilter';
import { CreateActressForm } from './components/createActressForm';
import { ActressCard } from '../../components/actressCard';
import { actressDetailRoute } from '../../utils/route';

const pageLength = 48;

const ActressesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
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
      <ActressFilter />
      <section className="bg-white p-8 min-h-screen shadow-lg">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(data?.actresses || []).map(actress => (
              <ActressCard
                key={actress.id}
                onClick={() => {
                  history.push(actressDetailRoute(actress.id));
                }}
                actress={actress}
              />
            ))}
          </div>
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
