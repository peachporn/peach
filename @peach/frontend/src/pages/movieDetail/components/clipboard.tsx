import { FunctionalComponent, h } from 'preact';
import { head, init, last } from 'ramda';
import { ActressSearch } from '../../../components/actressSearch';
import { Icon } from '../../../components/icon';
import { WebsiteSearch } from '../../../components/websiteSearch';
import { useMovieFormContext } from '../context/movieForm';

export const Clipboard: FunctionalComponent = ({}) => {
  const { originalMovie, extractMovieInformation, extractionFetchResult, clipboard, setClipboard } =
    useMovieFormContext();

  const addToClipboard = (s: string) => () => {
    if (clipboard.includes(s)) {
      const start = clipboard.indexOf(s);
      const withoutToken = `${clipboard.slice(0, start)}${clipboard.slice(
        start + s.length,
        clipboard.length,
      )}`;
      setClipboard(withoutToken.trim());
    } else {
      setClipboard(`${clipboard} ${s}`.trim());
    }
  };

  const containingFolder = last(init(originalMovie?.path.split('/')));

  return (
    <div className="py-4">
      <button className="mr-2" onClick={extractMovieInformation}>
        <Icon
          className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1 focus:outline-none active:bg-pink active:text-white transition-all"
          icon="person_search"
        />
      </button>

      {extractionFetchResult === undefined ? null : (
        <div className="pb-4">
          <div className="pt-6">
            {containingFolder && (
              <div className="flex w-full h-full items-center gap-2 text-sm">
                <button
                  onClick={addToClipboard(containingFolder)}
                  className={`rounded px-2 py-1 ${
                    clipboard.includes(containingFolder) ? 'bg-pink text-white' : ''
                  }`}
                >
                  {containingFolder}
                </button>
              </div>
            )}
            <div className="flex w-full h-full items-center gap-2 text-sm">
              {extractionFetchResult?.tokens.map(t => (
                <button
                  onClick={addToClipboard(t.token)}
                  className={`rounded px-2 py-1 ${t.detection ? 'text-gray-200' : ''}${
                    clipboard.includes(t.token) ? 'bg-pink text-white' : ''
                  }`}
                >
                  {t.token}
                </button>
              ))}
            </div>
          </div>
          <div className={clipboard ? 'mt-2 flex gap-2 items-center' : 'hidden'}>
            <span className="text-xl">{clipboard}</span>
          </div>
        </div>
      )}
    </div>
  );
};
