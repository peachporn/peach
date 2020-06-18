import { h, FunctionalComponent } from 'preact';
import { NavLink, Link } from 'react-router-dom';

import { useState } from 'preact/hooks';
import { Icon } from '../icon';
import { Logo } from '../logo';

export type RouteDefinition = {
  url: string;
  label?: string;
  icon?: Icon;
};

const NavigationLink: FunctionalComponent<RouteDefinition> = ({ url, label, icon }) => (
  <NavLink className="navigation__link" to={url}>
    {icon ? <Icon icon={icon} /> : null}
    {label || null}
  </NavLink>
);

export type NavigationProps = {
  links: RouteDefinition[];
};

export const Navigation: FunctionalComponent<NavigationProps> = ({ links }) => {
  const [expanded, setExpanded] = useState(false);
  const expand = () => setExpanded(true);
  const protract = () => setExpanded(false);

  return (
    <nav
      onMouseOver={expand}
      onMouseOut={protract}
      onFocus={expand}
      onBlur={protract}
      className={`navigation ${expanded ? 'navigation--expanded' : ''}`}
    >
      {expanded ? (
        <Icon className="navigation__dots" icon="close" onClick={protract} />
      ) : (
        <Icon className="navigation__dots" icon="more_vert" onClick={expand} />
      )}
      <Link className="navigation__logo-container" to="/">
        <Logo className="navigation__logo" />
      </Link>
      {links.map(({ url, icon, label }) => (
        <NavigationLink url={url} icon={icon} label={label} />
      ))}
    </nav>
  );
};
