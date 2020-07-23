import { Ref, h } from 'preact';
import { forwardRef } from 'preact/compat';
import composeRefs from '@seznam/compose-react-refs';
import { useEffect, useRef } from 'preact/hooks';
import { debounce } from '../../../utils/debounce';

type InputProps = {
  name: string;
  type?: 'text' | 'date' | 'file';
  appearance?: 'default' | 'wide' | 'display' | 'third';
  error?: boolean;
  placeholder?: string;
  onEnter?: OnEvent;
  onKeyUp?: OnEvent;
  onKeyDown?: OnEvent;
  onChange?: OnEvent;
  tabIndex?: number;
  autoFocus?: boolean;
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      appearance = 'default',
      placeholder,
      name,
      error,
      onKeyUp,
      onKeyDown,
      onEnter,
      onChange,
      tabIndex,
      autoFocus,
      className,
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
    const keyDown = onKeyDown ? debounce(onKeyDown, 300) : () => {};
    return (
      <input
        type={type}
        ref={composeRefs(ref, inputRef) as Ref<HTMLInputElement>}
        name={name}
        tabIndex={tabIndex}
        autoComplete="none"
        className={`input input--${appearance} ${error ? 'input--error' : ''} ${
          className || ''
        }`.trim()}
        onKeyUp={event => {
          if (onEnter && event.key === 'Enter') {
            onEnter(event);
          }
          keyUp(event);
        }}
        onKeyDown={keyDown}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  },
);
