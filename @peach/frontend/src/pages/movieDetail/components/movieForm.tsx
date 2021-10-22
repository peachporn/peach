import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { head } from 'ramda';
import {
  FetishesQuery,
  FetishesQueryVariables,
  MovieDetailFragment,
  UpdateMovieMutation,
  UpdateMovieMutationVariables,
} from '@peach/types';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'preact/hooks';
import { updateMovieMutation } from '../mutations/updateMovie.gql';
import { GenreSearch } from '../../../components/genreSearch';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { FetishBubble } from '../../../components/fetishBubble';
import { WebsiteSearch } from '../../../components/websiteSearch';
import { ActressSearch } from '../../../components/actressSearch';
import { useMovieInformationExtractor } from '../hooks/useMovieInformationExtractor';
import { MetadataTable } from './metadataTable';
import { MovieInformationExtractor } from './movieInformationExtractor';
import { MovieInformationExtractorButton } from './movieInformationExtractorButton';

export type MovieFormValues = {
  title: string;
  cover: string;
  website: string;
  fetishes: number[];
  actresses: number[];
};

export type MovieFormProps = {
  movie: MovieDetailFragment;
  onSubmit: () => {};
};

export const MovieForm: FunctionalComponent<MovieFormProps> = ({
  onSubmit: onSubmitCallback,
  movie,
}) => {
  const {
    extractMovieInformation,
    extractionResult,
    extractionFetchResult,
    clipboard,
    setClipboard,
    setActressSearchName,
    setWebsiteSearchName,
    websiteSearchName,
    actressSearchName,
  } = useMovieInformationExtractor({
    movieTitle: movie.title,
  });

  const { register, handleSubmit, watch, setValue, reset, formState } = useForm<MovieFormValues>({
    defaultValues: {
      title: movie.title,
      website: `${movie.website}`,
      cover: `${movie.cover}`,
      fetishes: movie.fetishes.map(f => f.id),
      actresses: movie.actresses.map(a => a.id),
    },
    reValidateMode: 'onBlur',
  });

  const [updateMovie] = useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(
    updateMovieMutation,
  );

  const onSubmit = (data: MovieFormValues) =>
    updateMovie({
      variables: {
        movieId: movie.id,
        input: {
          title: data.title,
          cover: data.cover ? parseInt(data.cover, 10) : undefined,
          website: data.website ? parseInt(data.website, 10) : undefined,
          actresses: (data.actresses as unknown as string)
            .split(',')
            .map(f => parseInt(f, 10))
            .filter(Boolean),
          fetishes: (data.fetishes as unknown as string)
            .split(',')
            .map(f => parseInt(f, 10))
            .filter(Boolean),
        },
      },
    }).then(() => {
      onSubmitCallback();
      reset();
    });

  const [title, setTitle] = useState<string | null>(null);
  useEffect(() => {
    if (title === null) return;
    setValue('title', title);
  }, [title]);

  const cover = watch('cover');
  const { isDirty } = formState;

  return (
    <div className="pb-16">
      <MovieInformationExtractor
        movie={movie}
        clipboard={clipboard}
        setClipboard={setClipboard}
        setActressSearchName={setActressSearchName}
        setWebsiteSearchName={setWebsiteSearchName}
        setTitle={setTitle}
        extractionFetchResult={extractionFetchResult}
      />
      <div className="grid grid-cols-1 md:grid-cols-7 gap-5 items-start">
        <div className="flex items-center md:col-span-3">
          <MovieInformationExtractorButton extractMovieInformation={extractMovieInformation} />
          <input
            className="w-full input leading-loose text-2xl font-display text-pink"
            name="title"
            placeholder={i('MOVIE_TITLE')}
            autoFocus
            ref={register({ required: true })}
          />
        </div>

        <div className="md:col-span-2 h-full">
          <input className="hidden" name="fetishes" ref={register} />
          <GenreSearch
            inputClassName="w-full"
            multiple
            defaultValue={movie.fetishes.map(f => f.id) || undefined}
            setValue={extractionResult.fetish}
            placeholder={i('MOVIE_ADD_FETISHES')}
            filterOverride={{ fetish: true }}
            onChange={fetishIds => {
              setValue('fetishes', fetishIds || '', { shouldDirty: true });
            }}
          />
        </div>

        <div className="md:col-span-2">
          <input className="hidden" name="website" ref={register} />
          <WebsiteSearch
            limit={1}
            containerClassName="md:grid-cols-1 :md:h-32"
            sliderClassName="md:grid-cols-2 h-full"
            inputClassName="w-full"
            defaultValue={movie.website?.id ? [movie.website.id] : undefined}
            setValue={extractionResult.website}
            setSearchName={websiteSearchName}
            placeholder={i('MOVIE_WEBSITE')}
            onChange={websiteIds => {
              setValue('website', head(websiteIds) || '', { shouldDirty: true });
            }}
          />
        </div>

        <div className="md:col-span-7 md:mt-5">
          <input className="hidden" name="actresses" ref={register} />
          <ActressSearch
            sliderClassName="md:grid-cols-7"
            inputClassName="w-full"
            multiple
            defaultValue={movie.actresses.map(f => f.id) || undefined}
            setValue={extractionResult.actresses}
            setSearchName={actressSearchName}
            placeholder={i('MOVIE_ACTRESSES')}
            onChange={actressIds => {
              setValue('actresses', actressIds || '', { shouldDirty: true });
            }}
          />
        </div>

        {!movie.metaData || !movie.volume ? null : (
          <MetadataTable
            className="md:col-span-5"
            metadata={movie.metaData}
            volume={movie.volume}
            path={movie.path}
          />
        )}

        <div className="md:col-span-7 relative grid grid-cols-1 md:grid-cols-5">
          <input className="absolute hidden" name="cover" ref={register} />
          {movie.screencaps.map(screencap => (
            <img
              src={screencap.src}
              onClick={() => {
                setValue('cover', screencap.index);
              }}
              alt={`${movie.title} #${screencap.index}`}
              className={`${
                cover === `${screencap.index}` ? 'border-pink' : 'border-transparent'
              } border-b-2 cursor-pointer`}
            />
          ))}
        </div>
      </div>

      <button
        className={`${
          !isDirty ? 'bg-gray-200' : 'bg-pink'
        } rounded-sm text-white py-1 px-3 w-full md:w-80 md:block md:mx-auto mt-4`}
        disabled={!isDirty}
        onClick={() => handleSubmit(onSubmit)()}
      >
        <Icon icon="check" />
      </button>
    </div>
  );
};
