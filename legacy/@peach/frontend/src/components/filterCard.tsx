import { VNode } from 'preact';
import { FC } from 'preact/compat';

type FilterCardProps = {
  onClick: () => void;
  descriptionSlot?: VNode;
  iconSlot: VNode;
  ctaSlot?: VNode;
};
export const FilterCard: FC<FilterCardProps> = ({
  onClick,
  iconSlot,
  descriptionSlot,
  ctaSlot,
  children,
}) => (
  <button
    onClick={onClick}
    className="p-2 justify-between rounded shadow focus:border-pink border-b-2 border-transparent focus:outline-none relative cursor-pointer flex items-center gap-1"
  >
    <div className={'flex items-center gap-2 w-full justify-between'}>
      <div className={'flex items-center gap-2'}>
        {iconSlot}
        <div className={'flex flex-col items-start'}>
          <span className={'text-xs text-gray-500'}>{descriptionSlot}</span>
          {children}
        </div>
      </div>
      {ctaSlot}
    </div>
  </button>
);
