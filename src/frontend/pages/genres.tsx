import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Flex, Loading } from '../../components';
import { BasePage } from './basePage';
import { genresCountQuery, genresListQuery } from '../queries/genreList.gql';
import { usePagination } from '../utils/pagination';

import { Pagination } from '../../components/components/pagination';
import { GenreCard, GenreCardGrid } from '../../components/components/genreCard';

const pageLength = 48;

export const GenresPage: FunctionalComponent = () => {
  const count = useQuery<GenresCountQuery>(genresCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip, maxPage, page, previousPage, nextPage } = usePagination({
    pageLength,
    maxItems: count.data.genresCount,
  });

  const { loading, data } = useQuery<GenresListQuery, GenresListQueryVariables>(genresListQuery, {
    variables: {
      limit,
      skip,
    },
  });

  return (
    <BasePage>
      {loading ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <GenreCardGrid>
            {data?.genres.map(g => (
              <GenreCard name={g.name} category={g.category} />
            ))}
          </GenreCardGrid>
          <Pagination page={page} maxPage={maxPage} onNext={nextPage} onPrevious={previousPage} />
        </Fragment>
      )}
    </BasePage>
  );
};
