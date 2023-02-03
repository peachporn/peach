import { useQuery } from '@apollo/client';
import { ActressCountQuery, ActressListQuery, ActressListQueryVariables } from '@peach/types';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { ActressCard } from '../../components/actressCard';
import { Loading } from '../../components/loading';
import { Pagination } from '../../components/pagination';
import { i } from '../../i18n/i18n';
import { actressDetailRoute } from '../../utils/route';
import { usePagination } from '../../utils/usePagination';
import { ActressFilter } from './components/actressFilter';
import { CreateActressFloatingButton } from './components/createActressFloatingButton';
import { ActressFilterContext, ActressFilterProvider } from './context/actressFilter';
import { actressCountQuery } from './queries/actressCount.gql';
import { actressListQuery } from './queries/actressList.gql';

const pageLength = 24;

const ActressesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
  const { filterInput } = useContext(ActressFilterContext);
  const count = useQuery<ActressCountQuery>(actressCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength,
    maxItems: count.data.actressCount,
  });

  const { page, backToStart, limit, skip } = pagination;

  const { refetch, loading, data } = useQuery<ActressListQuery, ActressListQueryVariables>(
    actressListQuery,
    {
      variables: {
        filter: filterInput,
        limit,
        skip,
      },
    },
  );

  useEffect(() => {
    backToStart();
    refetch();
  }, [filterInput]);

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_ACTRESSES')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
          {i('NAVIGATION_ACTRESSES')}
        </h1>
        <ActressFilter />
        <section className="bg-white p-8 min-h-screen shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              {data?.actresses.total === 0 ? null : (
                <span className={'text-sm'}>
                  {i('FOUND_X_ACTRESSES', {
                    count: data?.actresses.total.toString() ?? '?',
                    from: ((page - 1) * pageLength + 1).toString(),
                    to: Math.min(page * pageLength, data?.actresses.total || Infinity).toString(),
                  })}
                </span>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
                {(data?.actresses.actresses || []).map(actress => (
                  <ActressCard
                    key={actress.id}
                    onClick={() => {
                      history.push(actressDetailRoute(actress.id));
                    }}
                    actress={actress}
                  />
                ))}
              </div>
              <Pagination pagination={pagination} />
            </Fragment>
          )}
        </section>
        <CreateActressFloatingButton
          onSubmit={() => {
            count.refetch();
            refetch();
          }}
        />
      </main>
    </Fragment>
  );
};

export const ActressesPage = () => (
  <ActressFilterProvider>
    <ActressesPageComponent />
  </ActressFilterProvider>
);
