import { FunctionalComponent, h } from 'preact';
import { useMutation } from '@apollo/client';
import { takeAllScreencapsMutation } from '../mutations/takeScreencaps.gql';
import { scanLibraryMutation } from '../mutations/scanLibrary.gql';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';

export const TaskLauncher: FunctionalComponent = () => {
  const [takeAllScreencaps] = useMutation(takeAllScreencapsMutation);
  const [scanLibrary] = useMutation(scanLibraryMutation);

  return (
    <div className="flex items-start flex-col mb-4">
      <button className="py-2" onClick={() => scanLibrary()}>
        <Icon
          className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1.5 mr-2 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="play_arrow"
        />
        {i('SETTINGS_SCAN_LIBRARY')}
      </button>
      <button onClick={() => takeAllScreencaps()}>
        <Icon
          className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1.5 mr-2 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="play_arrow"
        />
        {i('SETTINGS_TAKE_SCREENCAPS')}
      </button>
    </div>
  );
};
