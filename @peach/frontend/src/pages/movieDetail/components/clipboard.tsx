import { FunctionalComponent, h } from 'preact';
import { init, last } from 'ramda';
import { useMovieFormContext } from '../context/movieForm';

export const Clipboard: FunctionalComponent = ({}) => {
  const { originalMovie, extractionFetchResult, clipboard, setClipboard } = useMovieFormContext();

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

  return extractionFetchResult === undefined ? null : (
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
        <div className="flex flex-wrap w-full h-full items-center gap-2 text-sm">
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
  );
};
