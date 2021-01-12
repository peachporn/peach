import { h, FunctionalComponent } from 'preact';
import { Navigation } from '../../components';
import { routes } from '../utils/route';

export type BasePageProps = {
  className?: string;
};

export const BasePage: FunctionalComponent<BasePageProps> = ({ className, children }) => (
  <div className={className}>
    <Navigation links={routes} />
    {children}
  </div>
);
