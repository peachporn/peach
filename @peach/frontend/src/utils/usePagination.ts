import { useEffect, useState } from 'preact/hooks';
import { useHistory, useLocation } from 'react-router-dom';

export type PaginationProps = {
  maxItems: number;
  pageLength: number;
};

export const usePagination = ({ maxItems, pageLength }: PaginationProps) => {
  const history = useHistory();
  const location = useLocation();

  const maxPage = Math.ceil(maxItems / pageLength);
  const search = new URLSearchParams(location.search);

  const pageFromLocation = () => parseInt(search.get('page') || '1', 10);

  const [page, setPageState] = useState(pageFromLocation());

  const setPage = (target: number) => {
    search.set('page', target.toString());

    setPageState(target);
    history.push({
      search: search.toString(),
    });
  };

  useEffect(() => {
    setPageState(pageFromLocation());
  }, [location.search]);

  const nextPage = () => {
    setPage(page + 1 <= maxPage ? page + 1 : 1);
  };
  const previousPage = () => {
    setPage(page > 1 ? page - 1 : 1);
  };

  return {
    limit: pageLength,
    skip: (page - 1) * pageLength,
    nextPage,
    previousPage,
    maxPage,
    page,
  };
};
