import { FunctionalComponent, h } from 'preact';
import { UseFormMethods } from 'react-hook-form';
import { useState } from 'preact/hooks';
import { i } from '../../../i18n/i18n';

type WebsiteImageFormFieldsProps = {
  register: UseFormMethods['register'];
};

export const WebsiteImageFormFields: FunctionalComponent<WebsiteImageFormFieldsProps> = ({
  register,
}) => {
  const [mode, setMode] = useState('url');

  return (
    <div className="grid grid-cols-1/3">
      {mode === 'file' && <input type="file" className="input" name="image" ref={register} />}
      {mode === 'url' && (
        <input className="input" name="imageUrl" placeholder={i('IMAGE_URL')} ref={register} />
      )}
      <select
        onChange={event => {
          setMode((event.target as HTMLSelectElement).value);
        }}
      >
        <option value="url">{i('UPLOAD_IMAGE_URL')}</option>
        <option value="file">{i('UPLOAD_IMAGE_FILE')}</option>
      </select>
    </div>
  );
};
