import { useState } from 'preact/hooks';

export type PaginationProps = {
  maxItems: number;
  pageLength: number;
};

export const usePagination = ({ maxItems, pageLength }: PaginationProps) => {
  const [page, setPage] = useState(1);

  const maxPage = Math.floor(maxItems / pageLength);

  const nextPage = () => {
    setPage(page + 1 <= maxPage ? page + 1 : 1);
  };
  const previousPage = () => {
    setPage(page + 1);
  };

  return {
    limit: pageLength,
    skip: (page - 1) * pageLength,
    nextPage,
    previousPage,
    maxPage,
  };
};
