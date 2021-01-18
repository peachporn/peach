import { FunctionalComponent, h } from 'preact';

export type IconType =
  | 'access_alarm'
  | 'add_circle'
  | 'add'
  | 'arrow_backward'
  | 'arrow_forward'
  | 'chevron_left'
  | 'chevron_right'
  | 'check'
  | 'clear'
  | 'close'
  | 'cloud'
  | 'delete_forever'
  | 'edit'
  | 'error'
  | 'local_offer'
  | 'more_vert'
  | 'movie'
  | 'person_pin'
  | 'search'
  | 'settings';

export type IconProps = {
  icon: IconType;
  className?: string;
  onClick?: (e: Event) => void;
};

export const Icon: FunctionalComponent<IconProps> = ({ className, icon, onClick }) => (
  <i tabIndex={0} role="button" className={`material-icons ${className}`} onClick={onClick}>
    {icon}
  </i>
);
