import { h } from 'preact';
import { forwardRef } from 'preact/compat';

type InputProps = {
  name: string;
  appearance?: 'default' | 'wide' | 'display';
  error?: boolean;
  placeholder?: string;
  onEnter?: EventHandler;
  tabIndex?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ appearance = 'default', placeholder, name, error, onEnter, tabIndex }: InputProps, ref) => (
    <input
      ref={ref}
      name={name}
      tabIndex={tabIndex}
      className={`input input--${appearance} ${error ? 'input--error' : ''}`.trim()}
      onKeyUp={event => {
        if (onEnter && event.key === 'Enter') {
          onEnter(event);
        }
      }}
      placeholder={placeholder}
    />
  ),
);
