import { h, FunctionalComponent } from 'preact';
import { NavLink } from 'react-router-dom';
import {
  actressesRoute,
  genresRoute,
  moviesRoute,
  settingsRoute,
  tasksRoute,
  websitesRoute,
} from '../utils/route';
import { Icon } from './icon';

const navLinkClass = 'flex flex-col items-center nav-link focus:outline-none';

export const MobileNavigation: FunctionalComponent = () => (
  <nav className="bg-gray-50 fixed bottom-0 left-0 text-gray-400 w-full py-4 text-xs">
    <ul className="flex justify-around">
      <li>
        <NavLink className={navLinkClass} to={moviesRoute}>
          <Icon icon="movie" />
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClass} to={actressesRoute}>
          <Icon icon="person_pin" />
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClass} to={websitesRoute}>
          <Icon icon="language" />
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClass} to={genresRoute}>
          <Icon icon="loyalty" />
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClass} to={settingsRoute}>
          <Icon icon="settings" />
        </NavLink>
      </li>
    </ul>
  </nav>
);
