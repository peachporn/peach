import { FunctionalComponent, h } from 'preact';
import { BubbleButton } from '../bubbleButton';
import { Icon } from '../icon';

type PaginationProps = {
  page: number;
  maxPage: number;
  onNext: OnEvent;
  onPrevious: OnEvent;
};

export const Pagination: FunctionalComponent<PaginationProps> = ({
  page,
  maxPage,
  onNext,
  onPrevious,
}) => (
  <div className="pagination">
    {page === 1 ? null : (
      <div className="pagination__previous">
        <BubbleButton onClick={onPrevious} label={<Icon icon="chevron_left" />} />
      </div>
    )}
    {page === maxPage ? null : (
      <div className="pagination__next">
        <BubbleButton onClick={onNext} label={<Icon icon="chevron_right" />} />
      </div>
    )}
  </div>
);
