import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { WebsitesCountQuery, WebsitesListQuery, WebsitesListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { usePagination } from '../../utils/usePagination';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { WebsiteCard } from '../../components/websiteCard';
import { websiteDetailRoute } from '../../utils/route';
import { Pagination } from '../../components/pagination';
import { WebsiteFilter } from './components/websiteFilter';
import { WebsiteFilterContext, WebsiteFilterProvider } from './context/websiteFilter';
import { CreateWebsiteFloatingButton } from './components/createWebsiteFloatingButton';
import { websitesCountQuery, websitesListQuery } from './queries/websiteList.gql';

const pageLength = 24;

const WebsitesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
  const { filter } = useContext(WebsiteFilterContext);
  const count = useQuery<WebsitesCountQuery>(websitesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const pagination = usePagination({
    pageLength,
    maxItems: count.data.websitesCount,
  });
  const { limit, skip } = pagination;

  const { refetch, loading, data } = useQuery<WebsitesListQuery, WebsitesListQueryVariables>(
    websitesListQuery,
    {
      variables: {
        filter,
        limit,
        skip,
      },
    },
  );

  return (
    <Fragment>
      <Helmet>
        <title>
          {i('PAGE_TITLE_WEBSITES')} {i('PAGE_TITLE_SUFFIX')}
        </title>
      </Helmet>
      <main className="pb-12">
        <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
          {i('NAVIGATION_WEBSITES')}
        </h1>
        <WebsiteFilter />
        <section className="bg-white p-8 min-h-screen shadow-lg">
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
              {(data?.websites || []).map(website => (
                <WebsiteCard
                  key={website.id}
                  onClick={() => {
                    history.push(websiteDetailRoute(website.id));
                  }}
                  website={website}
                />
              ))}
              <Pagination pagination={pagination} />
            </div>
          )}
        </section>
        <CreateWebsiteFloatingButton onSubmit={count.refetch} />
      </main>
    </Fragment>
  );
};

export const WebsitesPage = () => (
  <WebsiteFilterProvider>
    <WebsitesPageComponent />
  </WebsiteFilterProvider>
);
