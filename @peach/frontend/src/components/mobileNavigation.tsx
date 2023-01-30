import { FunctionalComponent, h } from 'preact';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  actressesRoute,
  genresRoute,
  homeRoute,
  moviesRoute,
  settingsRoute,
  tasksRoute,
  websitesRoute,
} from '../utils/route';
import { Icon } from './icon';

const navLinkClass = 'flex flex-col items-center nav-link focus:outline-none';

export const MobileNavigation: FunctionalComponent = () => {
  const location = useLocation();
  const isOnHome = location.pathname === homeRoute;
  return (
    <nav className="bg-gray-50 fixed bottom-0 left-0 text-gray-400 w-full py-4 text-xs z-40">
      <ul className="flex justify-around">
        <li>
          <Link className={`${navLinkClass} ${isOnHome ? 'active' : ''}`} to={homeRoute}>
            <Icon className="focus:outline-none" icon="home" />
          </Link>
        </li>
        <li>
          <NavLink className={navLinkClass} to={moviesRoute}>
            <Icon className="focus:outline-none" icon="movie" />
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to={actressesRoute}>
            <Icon className="focus:outline-none" icon="person_pin" />
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to={websitesRoute}>
            <Icon className="focus:outline-none" icon="language" />
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to={genresRoute}>
            <Icon className="focus:outline-none" icon="loyalty" />
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to={tasksRoute}>
            <Icon className="focus:outline-none" icon="dns" />
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to={settingsRoute}>
            <Icon className="focus:outline-none" icon="settings" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
