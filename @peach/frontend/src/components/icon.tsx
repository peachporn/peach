import { FunctionalComponent } from 'preact';

export type IconType =
  | 'access_alarm'
  | 'accessibility_new'
  | 'add_circle'
  | 'add'
  | 'arrow_backward'
  | 'arrow_forward'
  | 'chevron_left'
  | 'chevron_right'
  | 'check'
  | 'clear'
  | 'content_paste'
  | 'close'
  | 'cloud'
  | 'delete_forever'
  | 'dns'
  | 'edit'
  | 'find_replace'
  | 'home'
  | 'error'
  | 'expand_more'
  | 'expand_less'
  | 'language'
  | 'info'
  | 'local_offer'
  | 'loyalty'
  | 'keyboard_arrow_up'
  | 'more_vert'
  | 'movie'
  | 'person_pin'
  | 'person_search'
  | 'search'
  | 'settings'
  | 'space_bar'
  | 'restart_alt'
  | 'subtitles'
  | 'task_alt'
  | 'title'
  | 'play_arrow'
  | 'warning';

export type IconProps = {
  icon: IconType;
  className?: string;
  onClick?: (e: Event) => void;
};

export const Icon: FunctionalComponent<IconProps> = ({ className, icon, onClick }) => (
  <i
    tabIndex={0}
    role="button"
    className={`material-icons-round ${className || ''}`}
    onClick={onClick}
  >
    {icon}
  </i>
);
