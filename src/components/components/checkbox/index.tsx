import { Fragment, h } from 'preact';
import { forwardRef } from 'preact/compat';

export type CheckboxProps = {
  label?: string;
  name: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, name }, ref) => (
  <Fragment>
    <input name={name} ref={ref} type="checkbox" className="checkbox" />
    {!label ? null : <span className="checkbox__label">{label}</span>}
  </Fragment>
));
