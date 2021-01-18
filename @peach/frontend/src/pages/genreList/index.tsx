import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/client';
import { GenresCountQuery, GenresListQuery, GenresListQueryVariables } from '@peach/types';
import { usePagination } from '../../utils/usePagination';
import { genresCountQuery, genresListQuery } from './queries/genreList.gql';
import { CreateGenreForm } from './components/createGenreForm';
import { genreCategories } from '../../domain/genre';

const pageLength = 48;

export const GenresPage: FunctionalComponent = () => {
  const count = useQuery<GenresCountQuery>(genresCountQuery);

  if (count.loading || count.error || !count.data) {
    return <span>loading</span>;
  }

  const { limit, skip } = usePagination({
    pageLength: count.data.genresCount,
    maxItems: count.data.genresCount,
  });

  const { refetch, loading, data } = useQuery<GenresListQuery, GenresListQueryVariables>(
    genresListQuery,
    {
      variables: {
        limit,
        skip,
      },
    },
  );

  return (
    <Fragment>
      {loading ? (
        'loading...'
      ) : (
        <Fragment>
          <h1>Genres</h1>
          {genreCategories.map(c => (
            <Fragment>
              <h2>{c}</h2>
              <div className="flex">
                {data?.genres.filter(g => g.category === c).map(g => g.name)}
              </div>
            </Fragment>
          ))}
          <CreateGenreForm onSubmit={refetch} />
        </Fragment>
      )}
    </Fragment>
  );
};
