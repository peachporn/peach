import { FunctionalComponent, h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

import TouchEventHandler = JSXInternal.TouchEventHandler;

export type Icon =
  | 'close'
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
  onTouchStart?: TouchEventHandler<HTMLElement>;
};

export const Icon: FunctionalComponent<IconProps> = ({ className, icon, onTouchStart }) => (
  <i className={`material-icons ${className}`} onTouchStart={onTouchStart}>
    {icon}
  </i>
);
