import { FunctionalComponent, h } from 'preact';

export type Icon =
  | 'close'
  | 'search'
  | 'more_vert'
  | 'movie'
  | 'person_pin'
  | 'cloud'
  | 'local_offer'
  | 'settings'
  | 'edit';

export type IconProps = {
  icon: Icon;
  className?: string;
  onTouchStart?: (e: Event) => void;
};

export const Icon: FunctionalComponent<IconProps> = ({ className, icon, onTouchStart }) => (
  <i className={`material-icons ${className}`} onTouchStart={onTouchStart}>
    {icon}
  </i>
);
