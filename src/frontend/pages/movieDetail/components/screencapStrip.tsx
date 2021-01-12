import { Fragment, FunctionalComponent, h } from 'preact';
import { forwardRef } from 'preact/compat';

export const ScreencapStrip: FunctionalComponent = ({ children }) => (
  <ol className="screencap-strip">{children}</ol>
);

export const ScreencapGrid: FunctionalComponent = ({ children }) => (
  <ul className="screencap-grid">{children}</ul>
);

export type ScreencapAppearance = 'default' | 'tint';

export type ScreencapProps = {
  name: string;
  url: string;
  appearance?: ScreencapAppearance;
  value?: number;
  active?: boolean;
};

export const Screencap = forwardRef<HTMLInputElement, ScreencapProps>(
  ({ name, url, value, active, appearance }, ref) => {
    const children = (
      <Fragment>
        <img alt={name} src={url} />
        {value === undefined ? null : (
          <input type="radio" value={value} name={name} id={`screencap-input-${value}`} ref={ref} />
        )}
      </Fragment>
    );

    return (
      <li
        className={`screencap-strip__element ${active ? 'screencap-strip__element--active' : ''}${
          appearance === 'tint' ? 'screencap-strip__element--tint' : ''
        }`.trim()}
      >
        {value === undefined ? (
          children
        ) : (
          <label htmlFor={`screencap-input-${value}`}>{children}</label>
        )}
      </li>
    );
  },
);
