import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { debounce } from '../../../utils/debounce';

type InputProps = {
  name: string;
  appearance?: 'default' | 'wide' | 'display';
  error?: boolean;
  placeholder?: string;
  onEnter?: EventHandler;
  onKeyUp?: EventHandler;
  tabIndex?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { appearance = 'default', placeholder, name, error, onKeyUp, onEnter, tabIndex }: InputProps,
    ref,
  ) => {
    const keyUp = onKeyUp ? debounce(onKeyUp, 300) : () => {};
    return (
      <input
        ref={ref}
        name={name}
        tabIndex={tabIndex}
        className={`input input--${appearance} ${error ? 'input--error' : ''}`.trim()}
        onKeyUp={event => {
          if (onEnter && event.key === 'Enter') {
            onEnter(event);
          }
          keyUp(event);
        }}
        placeholder={placeholder}
      />
    );
  },
);
