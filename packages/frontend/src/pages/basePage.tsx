import { h, FunctionalComponent } from 'preact';
import { Navigation } from '@peach/components/src/components/navigation';
import { routes } from '../utils/route';

export const BasePage: FunctionalComponent = ({ children }) => (
  <div>
    <Navigation links={routes} />
    {children}
  </div>
);
