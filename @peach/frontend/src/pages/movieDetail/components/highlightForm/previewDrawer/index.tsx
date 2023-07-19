import { uniqBy } from 'ramda';
import { Icon } from '../../../../../components/icon';
import { DisplayableGenre } from '../display';

type GenreFormPreviewDrawerProps = {
  genreGrid: DisplayableGenre[];
  expanded: boolean;
  setExpanded: (x: boolean) => void;
};

export const GenreFormPreviewDrawer = ({
  genreGrid,
  setExpanded,
  expanded,
}: GenreFormPreviewDrawerProps) =>
  expanded ? null : (
    <div
      tabIndex={0}
      role="button"
      onClick={() => {
        setExpanded(true);
      }}
      className="relative grid grid-cols-100 p-4 bg-white"
    >
      <span className="absolute h-1/2 w-full border-b border-dashed border-gray-200 z-0" />
      {uniqBy(g => g.gridColumnStart, genreGrid).map(g => (
        <span
          style={{
            gridColumnStart: g.gridColumnStart?.toString(),
          }}
          className="rounded-full bg-gray-200 w-2 h-2 z-1"
        />
      ))}
      <Icon
        icon="expand_more"
        className="text-gray-200 absolute w-4 left-1/2 bottom-0 transform -translate-x-1/2"
      />
    </div>
  );
