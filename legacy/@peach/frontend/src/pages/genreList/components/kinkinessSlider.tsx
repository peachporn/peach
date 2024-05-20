import { FunctionalComponent, h } from 'preact';
import { UseFormMethods } from 'react-hook-form';
import { colorCodeKinkiness } from '../../../domain/genre';

type KinkinessSliderProps = {
  kinkiness: number;
  register?: UseFormMethods['register'];
  setValue?: UseFormMethods['setValue'];
  setKinkiness?: (kinkiness: number) => void;
  className?: string;
};

export const KinkinessSlider: FunctionalComponent<KinkinessSliderProps> = ({
  kinkiness,
  register,
  setValue,
  setKinkiness,
  className,
}) => (
  <div className={`grid grid-cols-3/1 ${className || ''}`}>
    <input
      type="range"
      className="range-input text-pink"
      min={0}
      max={40}
      name="kinkiness"
      value={kinkiness}
      onChange={event => {
        const { value } = event.target as HTMLInputElement;
        if (setKinkiness) {
          setKinkiness(parseInt(value, 10));
        }
      }}
      ref={
        register
          ? register({
              required: true,
            })
          : undefined
      }
    />
    <input
      onKeyUp={event => {
        const { value } = event.target as HTMLInputElement;
        if (value) {
          if (setValue) {
            setValue('kinkiness', value);
          }
          if (setKinkiness) {
            setKinkiness(parseInt(value, 10));
          }
        }
      }}
      className={`text-4xl font-bold text-center text-${colorCodeKinkiness(kinkiness)}`}
      value={kinkiness}
    />
  </div>
);
