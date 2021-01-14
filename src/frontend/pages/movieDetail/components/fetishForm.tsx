import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { uniq } from 'ramda';
import { setMovieFetishesMutation } from '../mutations/updateMovie.gql';
import { Input } from '../../../../components';
import { GenreCard, GenreCardList } from '../../../../components/components/genreCard';
import { i } from '../../../i18n/i18n';
import { findGenreQuery } from '../queries/findGenre.gql';

export type FetishFormProps = {
  movie: Pick<MovieDetailFragment, 'id' | 'title' | 'fetishes'>;
};

type FetishFormData = {
  genreName: string;
};

export const FetishForm: FunctionalComponent<FetishFormProps> = ({ movie }) => {
  const { watch, register, reset, handleSubmit } = useForm<FetishFormData>({
    mode: 'onChange',
    defaultValues: {
      genreName: '',
    },
  });

  const genreName = watch('genreName');

  const { data } = useQuery<FindGenreQuery, FindGenreQueryVariables>(findGenreQuery, {
    variables: {
      name: genreName,
      fetish: true,
    },
    skip: !genreName,
  });

  const [saveFetishes] = useMutation<SetMovieFetishesMutation, SetMovieFetishesMutationVariables>(
    setMovieFetishesMutation,
  );

  const submit = (fetishId: number, action: 'add' | 'remove') => () => {
    saveFetishes({
      variables: {
        movieId: movie.id,
        genreIds:
          action === 'add'
            ? uniq([...(movie.fetishes || []).map(f => f.id), fetishId])
            : (movie.fetishes || []).filter(f => f.id !== fetishId).map(f => f.id),
      },
    }).then(() => {
      reset();
    });
  };

  return (
    <div className="fetish-form">
      <Input
        tabIndex={1}
        ref={register}
        name="genreName"
        placeholder={i('FETISH')}
        onKeyUp={e => {
          if (e.key === 'Enter' && data?.genres.length === 1) {
            submit(data.genres[0].id, 'add')();
          }
        }}
      />
      {data?.genres && (
        <GenreCardList>
          {data?.genres.map(
            g =>
              g && (
                <GenreCard
                  shadow
                  genre={g}
                  headline={g.name}
                  categorySlot={null}
                  onClick={handleSubmit(submit(g.id, 'add'))}
                />
              ),
          )}
        </GenreCardList>
      )}
      <GenreCardList>
        {(movie.fetishes || []).map(
          g =>
            g && (
              <GenreCard
                shadow
                genre={g}
                headline={g.name}
                categorySlot={null}
                onClick={handleSubmit(submit(g.id, 'remove'))}
              />
            ),
        )}
      </GenreCardList>
    </div>
  );
};
