import { h, FunctionalComponent } from 'preact';
import { NavLink, Link } from 'react-router-dom';

import { useState } from 'preact/hooks';
import { Icon, Logo } from "../../components";

export type NavigationProps = {
  links: {
    url: string;
    label?: string;
    icon?: Icon;
  }[];
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
        <NavLink className="navigation__link" to={url}>
          {icon ? <Icon icon={icon} /> : null}
          {label || null}
        </NavLink>
      ))}
    </nav>
  );
};
