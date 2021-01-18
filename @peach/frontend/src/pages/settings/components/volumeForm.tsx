import { Fragment, FunctionalComponent, h } from 'preact';
import { useFieldArray } from 'react-hook-form';
import { useContext } from 'preact/hooks';
import { SettingsContext } from '../../../context/settings';
import { i } from '../../../i18n/i18n';
import { isTouched } from '../../../utils/form';
import { Icon } from '../../../components/icon';

export const VolumeForm: FunctionalComponent = () => {
  const {
    form: { register, control, watch },
  } = useContext(SettingsContext);

  const { fields, append } = useFieldArray({
    control,
    name: 'volumes',
    keyName: 'name',
  });

  return (
    <Fragment>
      <h2 className="text-xl mb-2 border-b mt-8">{i('SETTINGS_VOLUMES')}</h2>
      <div className="grid grid-cols-2 text-xs">
        {fields.map((volume, index) => (
          <Fragment>
            <input
              key={volume.name}
              className="input"
              placeholder="Name"
              name={`volumes[${index}].name`}
              value={volume.name}
              ref={register()}
            />
            <input
              key={volume.name}
              className="input"
              placeholder="Path"
              name={`volumes[${index}].path`}
              value={volume.path}
              ref={register()}
            />
          </Fragment>
        ))}
      </div>
      <div className="w-full flex justify-center pt-3">
        <button
          onClick={() => {
            append({ name: '', path: '' });
          }}
        >
          <Icon className="bg-pink rounded-full p-1 block mx-auto text-white" icon="add" />
        </button>
      </div>
    </Fragment>
  );
};
