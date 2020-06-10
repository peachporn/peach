import { h, FunctionalComponent } from 'preact';
import { Navigation } from '../../components';
import { routes } from '../utils/route';

export const BasePage: FunctionalComponent = ({ children }) => (
  <div>
    <Navigation links={routes} />
    {children}
  </div>
);
