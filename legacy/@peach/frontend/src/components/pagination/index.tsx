import { FunctionalComponent, h } from 'preact';
import { Icon } from '../icon';
import { UsePaginationMethods } from '../../utils/usePagination';

type PaginationComponentProps = {
  pagination: UsePaginationMethods;
};

export const Pagination: FunctionalComponent<PaginationComponentProps> = ({
  pagination: { nextPage, previousPage },
}) => (
  <div className="h-14 pb-3 flex gap-2 rounded-full bg-gray-50 fixed bottom-8 left-1/2 transform-gpu -translate-x-1/2 text-pink">
    <button onClick={previousPage}>
      <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="chevron_left" />
    </button>
    <div className="px-6" />
    <button onClick={nextPage}>
      <Icon className="w-10 h-10 focus:outline-none text-3xl text-glow" icon="chevron_right" />
    </button>
  </div>
);
