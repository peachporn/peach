import { FunctionalComponent, h } from 'preact';
import { head, uniq } from 'ramda';
import { ActressSearch } from '../../../components/actressSearch';
import { GenreSearch } from '../../../components/genreSearch';
import { Icon } from '../../../components/icon';
import { WebsiteSearch } from '../../../components/websiteSearch';
import { i } from '../../../i18n/i18n';
import { useMovieFormContext } from '../context/movieForm';
import { Clipboard } from './clipboard';
import { DangerZone } from './dangerZone';
import { MetadataTable } from './metadataTable';
import { TitleGoogleSearchButton } from './titleGoogleSearchButton';

export type MovieFormProps = {
  onCancel: () => void;
};

export const MovieForm: FunctionalComponent<MovieFormProps> = ({ onCancel }) => {
  const {
    originalMovie,
    title,
    setTitle,
    fetishIds,
    setFetishIds,
    websiteId,
    setWebsiteId,
    actressIds,
    setActressIds,
    cover,
    setCover,
    isDirty,
    submit,
    actressSearchTerm,
    setActressSearchTerm,
    websiteSearchTerm,
    setWebsiteSearchTerm,
    clipboard,
    setClipboard,
    extractMovieInformation,
  } = useMovieFormContext();

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-5 items-start">
        <div className="flex flex-col md:col-span-3">
          <div className="w-full relative">
            <input
              className="w-full input pr-8"
              name="title"
              placeholder={i('MOVIE_TITLE')}
              autoFocus
              value={title}
              onChange={event => setTitle((event.target as HTMLInputElement).value)}
            />
            <div className="absolute bottom-1 right-1 text-gray-500">
              {!clipboard ? undefined : (
                <button
                  onClick={() => {
                    setTitle(clipboard);
                    setClipboard('');
                  }}
                >
                  <Icon icon="content_paste" />
                </button>
              )}
            </div>
          </div>
          <div className="py-4">
            <button className="mr-2" onClick={extractMovieInformation}>
              <Icon
                className="w-8 h-8 text-sm bg-gray-100 rounded-full p-1 focus:outline-none active:bg-pink active:text-white transition-all"
                icon="person_search"
              />
            </button>

            <Clipboard />
            <TitleGoogleSearchButton />
          </div>
        </div>

        <div className="md:col-span-2 h-full">
          <GenreSearch
            filterOverride={{ fetish: true }}
            multiple
            setValue={fetishIds}
            onChange={setFetishIds}
            placeholder={i('MOVIE_ADD_FETISHES')}
            inputClassName="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <WebsiteSearch
            limit={1}
            setValue={websiteId ? [websiteId] : undefined}
            setSearchName={websiteSearchTerm}
            placeholder={i('MOVIE_WEBSITE')}
            onChange={(websiteIds, newFetishIds) => {
              setWebsiteId(head(websiteIds));
              setFetishIds(uniq([...fetishIds, ...newFetishIds]));
            }}
            controlsSlot={
              !clipboard ? undefined : (
                <button
                  onClick={() => {
                    setWebsiteSearchTerm(clipboard);
                    setClipboard('');
                  }}
                >
                  <Icon icon="content_paste" />
                </button>
              )
            }
            containerClassName="md:grid-cols-1 :md:h-32"
            sliderClassName="md:grid-cols-2 h-full"
            inputClassName="w-full"
          />
        </div>

        <div className="md:col-span-7 md:mt-5">
          <ActressSearch
            sliderClassName="md:grid-cols-7"
            inputClassName="w-full"
            multiple
            setValue={actressIds}
            controlsSlot={
              !clipboard ? undefined : (
                <button
                  onClick={() => {
                    setActressSearchTerm(clipboard);
                    setClipboard('');
                  }}
                >
                  <Icon icon="content_paste" />
                </button>
              )
            }
            setSearchName={actressSearchTerm}
            placeholder={i('MOVIE_ACTRESSES')}
            onChange={setActressIds}
          />
        </div>

        <div className="md:col-span-7 relative grid grid-cols-1 md:grid-cols-5">
          {originalMovie.screencaps.map(screencap => (
            <img
              src={screencap.src}
              onClick={() => {
                setCover(screencap.index);
              }}
              alt={`${title} #${screencap.index}`}
              className={`${
                cover === screencap.index ? 'border-pink' : 'border-transparent'
              } border-b-2 cursor-pointer`}
            />
          ))}
        </div>

        {!originalMovie.metaData || !originalMovie.volume ? null : (
          <MetadataTable
            className="md:col-span-5"
            metadata={originalMovie.metaData}
            volume={originalMovie.volume}
            path={originalMovie.path}
          />
        )}
      </div>

      <button
        className={`${
          !isDirty ? 'bg-gray-200' : 'bg-pink'
        } rounded-sm text-white py-1 px-3 w-full md:w-80 md:block md:mx-auto mt-4`}
        disabled={!isDirty}
        onClick={submit}
      >
        <Icon icon="check" />
      </button>
      <button
        className={
          'bg-gray-200 rounded-sm text-white py-1 px-3 w-full md:w-80 md:block md:mx-auto mt-4'
        }
        onClick={onCancel}
      >
        <Icon icon="clear" />
      </button>
      <DangerZone movieId={originalMovie.id} />
    </div>
  );
};
