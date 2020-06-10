import { h } from 'preact';
import { forwardRef } from 'preact/compat';

type InputProps = {
  name: string;
  appearance?: 'default' | 'wide';
  error?: boolean;
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ appearance = 'default', placeholder, name, error }: InputProps, ref) => (
    <input
      ref={ref}
      name={name}
      className={`input input--${appearance} ${error ? 'input--error' : ''}`.trim()}
      placeholder={placeholder}
    />
  ),
);
