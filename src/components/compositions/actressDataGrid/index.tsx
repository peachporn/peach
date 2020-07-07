import { FunctionalComponent, h, VNode } from 'preact';
import { i, I18nKey } from '../../../frontend/i18n/i18n';

type GridEntryProps = {
  value?: string | VNode;
  label: I18nKey;
};

export const ActressDataGridEntry: FunctionalComponent<GridEntryProps> = ({ value, label }) =>
  !value ? null : (
    <div className="actress-data-grid__entry">
      <dt className="actress-data-grid__label">{i(label)}</dt>
      <dd className="actress-data-grid__value">{value}</dd>
    </div>
  );

export const ActressDataGridContainer: FunctionalComponent = ({ children }) => (
  <dl className="actress-data-grid">{children}</dl>
);
