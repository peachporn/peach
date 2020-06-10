import { h, FunctionalComponent } from 'preact';

import logo from '../../static/logo.png';

export type LogoProps = {
  className?: string;
};
export const Logo: FunctionalComponent<LogoProps> = ({ className }) => (
  <img className={className} alt="Peach" src={logo} />
);
