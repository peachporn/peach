import { h, FunctionalComponent, VNode } from 'preact';
import { UseFormMethods } from 'react-hook-form';

type CheckboxProps = {
  name: string;
  register: UseFormMethods['register'];
  label: VNode;
};

export const Checkbox: FunctionalComponent<CheckboxProps> = ({ name, register, label }) => (
  <label className="pl-5 relative flex items-center" htmlFor={name}>
    <input className="hidden" type="checkbox" ref={register} name={name} id={name} />
    <span className="absolute w-4 h-4 border border-gray-400 rounded-sm left-0 top-1/2 transform-gpu -translate-y-1/2 text-pink transition transition-all checkbox-indicator" />
    {label}
  </label>
);
