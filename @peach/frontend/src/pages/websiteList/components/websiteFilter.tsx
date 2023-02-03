import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { Icon } from '../../../components/icon';
import { i } from '../../../i18n/i18n';
import { WebsiteFilterContext } from '../context/websiteFilter';

export const WebsiteFilter: FunctionalComponent = () => {
  const [visible, setVisible] = useState(false);
  const { filterInput, setName } = useContext(WebsiteFilterContext);

  return (
    <div className={`bg-white shadow w-full px-8 ${visible ? 'pt-4' : 'py-4'}`}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 place-items-center flex rounded-full p-2 focus:outline-none bg-gray-50">
          <Icon
            icon="search"
            className="text-pink text-glow"
            onClick={() => {
              setVisible(!visible);
            }}
          />
          <input
            className="input border-b-0 bg-gray-50 w-full"
            value={filterInput.name}
            placeholder={visible ? i('WEBSITE_FILTER_NAME') : ''}
            onClick={() => {
              setVisible(!visible);
            }}
            onKeyUp={e => {
              setName((e.target as HTMLInputElement).value);
            }}
          />
        </div>
      </div>
      <div
        className={`${
          visible ? 'max-h-full pb-8' : 'max-h-0'
        } relative grid items-start grid-cols-1 md:grid-cols-4 gap-3 transition-all overflow-hidden`}
      >
        <Icon
          icon="keyboard_arrow_up"
          className={`${
            visible ? 'block' : 'hidden'
          } absolute bottom-0 w-full text-center bg-gray-50`}
          onClick={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
