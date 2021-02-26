import { FunctionalComponent, h } from 'preact';

type SliderProps = {
  className?: string;
  padding?: number;
};

export const Slider: FunctionalComponent<SliderProps> = ({ children, padding = 8, className }) => (
  <div
    className={`overflow-x-auto flex md:grid md:overflow-hidden gap-3 py-2 scroll-snap scroll-px-${padding} px-${padding} ${className}`}
  >
    {children}
    {padding >= 0 ? <div className={`flex-none ml-${padding} w-${padding}`} /> : null}
  </div>
);

export const SliderItem: FunctionalComponent = ({ children }) => (
  <div className="flex-none snap-align-start md:w-full h-full">{children}</div>
);
