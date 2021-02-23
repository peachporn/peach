import { FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { WebsitesCountQuery, WebsitesListQuery, WebsitesListQueryVariables } from '@peach/types';
import { useContext } from 'preact/hooks';
import { useHistory } from 'react-router-dom';
import { usePagination } from '../../utils/usePagination';
import { websitesCountQuery, websitesListQuery } from './queries/websiteList.gql';
import { CreateWebsiteForm } from './components/createWebsiteForm';
import { i } from '../../i18n/i18n';
import { Loading } from '../../components/loading';
import { WebsiteFilterContext, WebsiteFilterProvider } from './context/websiteFilter';
import { WebsiteFilter } from './components/websiteFilter';
import { WebsiteCard } from '../../components/websiteCard';
import { websiteDetailRoute } from '../../utils/route';

const pageLength = 48;

const WebsitesPageComponent: FunctionalComponent = () => {
  const history = useHistory();
  const { filter } = useContext(WebsiteFilterContext);
  const count = useQuery<WebsitesCountQuery>(websitesCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading />;
  }

  const { limit, skip } = usePagination({
    pageLength: count.data.websitesCount,
    maxItems: count.data.websitesCount,
  });

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
    <main className="pb-12">
      <h1 className="font-display pt-8 text-3xl text-white pl-6 text-shadow-md">
        {i('NAVIGATION_WEBSITES')}
      </h1>
      <WebsiteFilter />
      <section className="bg-white p-8 min-h-screen shadow-lg">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(data?.websites || []).map(website => (
              <WebsiteCard
                key={website.id}
                onClick={() => {
                  history.push(websiteDetailRoute(website.id));
                }}
                website={website}
              />
            ))}
          </div>
        )}
      </section>
      <CreateWebsiteForm onSubmit={count.refetch} />
    </main>
  );
};

export const WebsitesPage = () => (
  <WebsiteFilterProvider>
    <WebsitesPageComponent />
  </WebsiteFilterProvider>
);
