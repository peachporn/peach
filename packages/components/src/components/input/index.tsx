import { h } from 'preact';
import { forwardRef } from 'preact/compat';

type InputProps = {
  name: string;
  appearance?: 'default' | 'wide';
  placeholder?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ appearance = 'default', placeholder, name }: InputProps, ref) => (
    <input
      ref={ref}
      name={name}
      className={`input input--${appearance}`}
      placeholder={placeholder}
    />
  ),
);
