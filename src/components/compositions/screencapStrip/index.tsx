import { FunctionalComponent, h } from 'preact';
import { forwardRef } from 'preact/compat';

export const ScreencapStrip: FunctionalComponent = ({ children }) => (
  <ol className="screencap-strip">{children}</ol>
);

export type ScreencapProps = {
  name: string;
  url: string;
  value: number;
  active: boolean;
};

export const Screencap = forwardRef<HTMLInputElement, ScreencapProps>(
  ({ name, url, value, active }, ref) => (
    <li
      className={`screencap-strip__element ${
        active ? 'screencap-strip__element--active' : ''
      }`.trim()}
    >
      <label htmlFor={`screencap-input-${value}`}>
        <img alt={name} src={url} />
        <input type="radio" value={value} name={name} id={`screencap-input-${value}`} ref={ref} />
      </label>
    </li>
  ),
);
