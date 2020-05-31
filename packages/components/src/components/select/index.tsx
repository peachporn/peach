import { FunctionalComponent, h } from 'preact';

type SelectProps = {
  onChange?: (value: string | null) => void;
};

export const Select: FunctionalComponent<SelectProps> = ({ children }) => (
  <select
    onChange={event => {
      console.log(event);
    }}
    className="select"
  >
    {children}
  </select>
);
