import { FunctionalComponent, h } from 'preact';
import { ScrapeAlternativeFragment } from '@peach/types';

type ActressAlternativeListProps = {
  alternatives: ScrapeAlternativeFragment[];
  onSelect: (selected: ScrapeAlternativeFragment) => void;
};

export const ActressAlternativeList: FunctionalComponent<ActressAlternativeListProps> = ({
  alternatives,
  onSelect,
}) => (
  <div className="grid grid-cols-2 p-2">
    {alternatives.map(alternative => (
      <button className="flex flex-col shadow rounded-sm" onClick={() => onSelect(alternative)}>
        {!alternative.pictureUrl ? null : <img alt="" src={alternative.pictureUrl} />}
        <span className="px-2 block">{alternative.name}</span>
        <span className="px-2 text-left text-xs">{alternative.aliases?.join(', ')}</span>
      </button>
    ))}
  </div>
);
