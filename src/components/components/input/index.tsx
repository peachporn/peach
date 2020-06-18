import { Ref, h } from 'preact';
import { forwardRef } from 'preact/compat';
import composeRefs from '@seznam/compose-react-refs';
import { useEffect, useRef } from 'preact/hooks';
import { debounce } from '../../../utils/debounce';

type InputProps = {
  name: string;
  appearance?: 'default' | 'wide' | 'display';
  error?: boolean;
  placeholder?: string;
  onEnter?: OnEvent;
  onKeyUp?: OnEvent;
  tabIndex?: number;
  autoFocus?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      appearance = 'default',
      placeholder,
      name,
      error,
      onKeyUp,
      onEnter,
      tabIndex,
      autoFocus,
    }: InputProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current && autoFocus) {
        inputRef.current.focus();
      }
    }, [inputRef]);

    const keyUp = onKeyUp ? debounce(onKeyUp, 300) : () => {};
    return (
      <input
        ref={composeRefs(ref, inputRef) as Ref<HTMLInputElement>}
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
