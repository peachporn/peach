import { FunctionalComponent, Fragment, h } from 'preact';
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
import { updateMovieMutation } from '../mutations/updateMovie.gql';
import { GenreSearch } from '../../../components/genreSearch';
import { i } from '../../../i18n/i18n';
import { Icon } from '../../../components/icon';
import { FetishBubble } from '../../../components/fetishBubble';
import { WebsiteSearch } from '../../../components/websiteSearch';
import { ActressSearch } from '../../../components/actressSearch';

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
  console.log(movie.actresses, movie.fetishes);
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
          actresses: ((data.actresses as unknown) as string)
            .split(',')
            .map(f => parseInt(f, 10))
            .filter(Boolean),
          fetishes: ((data.fetishes as unknown) as string)
            .split(',')
            .map(f => parseInt(f, 10))
            .filter(Boolean),
        },
      },
    }).then(() => {
      onSubmitCallback();
      reset();
    });

  const { isDirty } = formState;

  return (
    <div className="pb-16">
      <div className="grid grid-cols-1 gap-5">
        <input
          className="input leading-loose text-2xl font-display text-pink"
          name="title"
          placeholder={i('MOVIE_TITLE')}
          autoFocus
          ref={register({ required: true })}
        />

        <div>
          <input className="hidden" name="fetishes" ref={register} />
          <GenreSearch
            inputClassName="w-full"
            multiple
            defaultValue={movie.fetishes.map(f => f.id) || undefined}
            placeholder={i('MOVIE_ADD_FETISHES')}
            filterOverride={{ fetish: true }}
            onChange={fetishIds => {
              setValue('fetishes', fetishIds || '', { shouldDirty: true });
            }}
          />
        </div>

        <div>
          <input className="hidden" name="actresses" ref={register} />
          <ActressSearch
            inputClassName="w-full"
            multiple
            defaultValue={movie.actresses.map(f => f.id) || undefined}
            placeholder={i('MOVIE_ACTRESSES')}
            onChange={actressIds => {
              setValue('actresses', actressIds || '', { shouldDirty: true });
            }}
          />
        </div>

        <div>
          <input className="hidden" name="website" ref={register} />
          <WebsiteSearch
            inputClassName="w-full"
            defaultValue={movie.website?.id ? [movie.website.id] : undefined}
            placeholder={i('MOVIE_WEBSITE')}
            onChange={websiteIds => {
              setValue('website', head(websiteIds) || '', { shouldDirty: true });
            }}
          />
        </div>
      </div>

      <button
        className={`${
          !isDirty ? 'bg-gray-200' : 'bg-pink'
        } rounded-sm text-white py-1 px-3 w-full mt-4`}
        disabled={!isDirty}
        onClick={() => handleSubmit(onSubmit)()}
      >
        <Icon icon="check" />
      </button>
    </div>
  );
};
