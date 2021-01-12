import { FunctionalComponent, h, VNode } from 'preact';
import { i, I18nKey } from '../i18n/i18n';

type GridEntryProps = {
  value?: string | VNode;
  label: I18nKey;
};

export const DataGridEntry: FunctionalComponent<GridEntryProps> = ({ value, label }) =>
  !value ? null : (
    <div className="data-grid__entry">
      <dt className="data-grid__label">{i(label)}</dt>
      <dd className="data-grid__value">{value}</dd>
    </div>
  );

export const DataGridContainer: FunctionalComponent = ({ children }) => (
  <dl className="data-grid">{children}</dl>
);
