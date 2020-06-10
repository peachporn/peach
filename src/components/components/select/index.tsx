import { h, RenderableProps } from 'preact';
import { forwardRef } from 'preact/compat';

type SelectProps = {
  name: string;
};

export const Select = forwardRef<HTMLSelectElement, RenderableProps<SelectProps>>(
  ({ name, children }, ref) => (
    <select ref={ref} name={name} className="select">
      {children}
    </select>
  ),
);
