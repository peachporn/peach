import { FunctionalComponent, h, JSX } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import { equals, path } from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/components/button';
import { Input } from '../../../../components/components/input';
import { i } from '../../../i18n/i18n';
import { findGenreQuery } from '../../../queries/findGenre.gql';
import { GenreCard, GenreCardList } from '../../../../components/components/genreCard';
import { GenreClip, GenreClipList } from '../../../../components/components/genreClip';
import { Icon } from '../../../../components/components/icon';
import { GenreDefinitionDraft, DefinableGenre } from './types';
import { pause, playPause, scrub } from './video';
import { addChildToGenreDefinition, removeChildFromGenreDefinition } from './genreLink';
import { throttle } from '../../../../utils/debounce';
import { isTouched } from '../../../utils/form';
import { Text } from '../../../../components/components/text';
import { updateGenreDefinitionsMutation } from '../../../mutations/updateGenreDefinitions.gql';

type UnMaybe<T> = T extends undefined ? never : T;

export type GenreFormProps = {
  movie: UnMaybe<MovieQuery['movie']>;
  video: PropRef<HTMLVideoElement>;
};

export const GenreForm: FunctionalComponent<GenreFormProps> = ({ movie, video }) => {
  /*
   *  VIDEO */
  const [currentTime, setCurrentTime] = useState(0);
  const duration = video.current?.duration || 1;

  const onTimeUpdate = useRef(
    throttle(() => {
      setCurrentTime(video.current?.currentTime || 0);
    }, 1000),
  ).current;

  useEffect(() => {
    video.current?.addEventListener('timeupdate', onTimeUpdate);
    return () => video.current?.removeEventListener('timeupdate', onTimeUpdate);
  });

  /*
   *  GENRE DEFINITIONS */
  const [genreDefinitions, setGenreDefinitions] = useState<GenreDefinitionDraft[]>(movie.genres);

  /*
   *  FORM */
  const { register, watch, reset: resetForm } = useForm<{ genreName: string }>({
    defaultValues: { genreName: '' },
  });
  const genreName = watch('genreName');

  /*
   *  GENRE FOCUS */
  const [focusedGenre, focusGenre] = useState<GenreDefinitionDraft | null>(null);
  useEffect(() => {
    const focusedGenreWasRemoved =
      focusedGenre && !genreDefinitions.find(g => g.timeStart === focusedGenre.timeStart);

    if (focusedGenreWasRemoved) {
      focusGenre(null);
    }
  });

  /*
   *  GENRE CANDIDATES */
  const { data } = useQuery<FindGenreQuery, FindGenreQueryVariables>(findGenreQuery, {
    skip: genreName === '',
    variables: {
      name: genreName || '',
    },
  });

  const genreCandidates = (data?.genres || []).filter(g =>
    !focusedGenre
      ? g.validAsRoot
      : focusedGenre.genre.parent.linkableChildren.map(x => x.id).includes(g.id),
  );

  /*
   *  CANDIDATE FOCUS */
  const [focusedCandidate, focusCandidate] = useState<number | null>(null);

  const focusNextCandidate = () => {
    focusCandidate(
      focusedCandidate === null || focusedCandidate === genreCandidates.length - 1
        ? 0
        : focusedCandidate + 1,
    );
  };

  const focusPreviousCandidate = () => {
    focusCandidate(
      focusedCandidate === null || focusedCandidate === 0
        ? genreCandidates.length - 1
        : focusedCandidate - 1,
    );
  };

  const reset = () => {
    resetForm();
    focusCandidate(null);
  };

  /*
   *
   *  TEXT INPUT */
  const textInput = useRef<HTMLInputElement>();
  const focusTextInput = () => {
    if (!textInput.current) {
      return;
    }
    textInput.current.focus();
  };

  const trimTextInput = () => {
    if (!textInput.current) {
      return;
    }
    textInput.current.value = textInput.current.value.trim();
  };

  /*
   *
   *  ADDING */
  const addGenreDefinition = (genre: DefinableGenre) => {
    const genreDefinition = { genre: { parent: genre, children: [] }, timeStart: currentTime };
    setGenreDefinitions([...genreDefinitions, genreDefinition]);

    if (genre.linkableChildren.length > 0) {
      focusGenre(genreDefinition);
    }

    reset();
  };

  const addSubgenre = (genre: DefinableGenre, genreDefinition: GenreDefinitionDraft) => {
    const x = addChildToGenreDefinition(genreDefinition, genre)(genreDefinitions);
    console.log(x);
    setGenreDefinitions(x);
    reset();
  };

  const addGenreOrSubgenre = (genre: DefinableGenre) => {
    if (focusedGenre) {
      addSubgenre(genre, focusedGenre);
    } else {
      addGenreDefinition(genre);
    }
    focusTextInput();
  };

  /*
   *
   *  REMOVING */
  const removeSubgenreFromGenre = (genreDefinition: GenreDefinitionDraft, childId: number) => {
    setGenreDefinitions(removeChildFromGenreDefinition(genreDefinition, childId)(genreDefinitions));
  };

  const removeGenreDefinition = (genre: GenreDefinitionDraft) => {
    focusGenre(null);
    setGenreDefinitions(genreDefinitions.filter(g => g.timeStart !== genre.timeStart));
    reset();
  };

  /*
   *
   *  KEY HANDLING */
  const handleKey = ({
    key,
    ctrlKey,
    metaKey,
    altKey,
    shiftKey,
    preventDefault,
  }: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    preventDefault();

    if (key === 'Escape') {
      focusGenre(null);
      return;
    }

    if (key === 'ArrowUp' && genreCandidates.length) {
      focusNextCandidate();
      return;
    }

    if (key === 'ArrowDown' && genreCandidates.length) {
      focusPreviousCandidate();
      return;
    }

    if (key === 'Enter') {
      if (focusedCandidate !== null || genreCandidates.length === 1) {
        addGenreOrSubgenre(genreCandidates[focusedCandidate || 0]);
        playPause(video);
        return;
      }
    }

    if (key === ' ' && shiftKey) {
      playPause(video);
      trimTextInput();
      return;
    }

    const u = key === 'ArrowUp';
    const r = key === 'ArrowRight';
    const d = key === 'ArrowDown';
    const l = key === 'ArrowLeft';
    const offset =
      (ctrlKey || metaKey) && (r || l)
        ? 60
        : (ctrlKey || metaKey) && (u || d)
        ? 30
        : shiftKey && (r || l)
        ? 10
        : shiftKey && (u || d)
        ? 5
        : altKey
        ? 1
        : 0;

    if (offset) {
      scrub(r || u ? offset : -offset, video);
      return;
    }

    if ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(key)) {
      pause(video);
    }
  };

  /*
   *
   *  FORM SUBMITTING */

  const [save] = useMutation<
    UpdateGenreDefinitionsMutation,
    UpdateGenreDefinitionsMutationVariables
  >(updateGenreDefinitionsMutation);

  const submit = () => {
    save({
      variables: {
        movieId: movie.id,
        genreDefinitions: genreDefinitions.map(g => ({
          timeStart: g.timeStart,
          timeEnd: g.timeEnd || duration,
          genre: {
            parent: g.genre.parent.id,
            children: g.genre.children.map(c => c.id),
          },
        })),
      },
    }).then(() => {
      toast.success(i('SCENE_FORM_SUCCESS'));
      reset();
    });
  };

  return (
    <div className="scene-form">
      <div className="scene-view">
        <span className="scene-view__marker scene-view__marker--current">
          <GenreClipList>
            {genreDefinitions.map(genreDefinition => (
              <GenreClip
                key={genreDefinition.genre.parent.id}
                shadow
                genre={genreDefinition.genre.parent}
                focus={focusedGenre?.timeStart === genreDefinition.timeStart}
                descriptionSlot={<Text size="S">{genreDefinition.genre.parent.name}</Text>}
                interactionSlot={
                  <Icon
                    className="genre-clip__delete"
                    icon="close"
                    onClick={() => {
                      removeGenreDefinition(genreDefinition);
                    }}
                  />
                }
                onClick={e => {
                  e.stopPropagation();
                  if (focusedGenre && focusedGenre.timeStart === genreDefinition.timeStart) {
                    focusGenre(null);
                  } else {
                    focusGenre(genreDefinition);
                  }
                }}
              >
                {genreDefinition.genre.children.length === 0 ? null : (
                  <div className="scene-view__subgenres">
                    {genreDefinition.genre.children.map(c => (
                      <GenreClip
                        key={c.id}
                        genre={c}
                        appearance="tiny"
                        descriptionSlot={<Text size="XS">{c.name}</Text>}
                        onClick={e => {
                          e.stopPropagation();
                          removeSubgenreFromGenre(genreDefinition, c.id);
                        }}
                      />
                    ))}
                  </div>
                )}
              </GenreClip>
            ))}
          </GenreClipList>
        </span>
      </div>
      <Input
        name="genreName"
        className="scene-form__input"
        onKeyDown={handleKey}
        ref={e => {
          textInput.current = e;
          register(e);
        }}
        placeholder={i('SCENE_FORM_PLACEHOLDER')}
      />
      <GenreCardList className="scene-form__genres">
        {genreCandidates.map((g, j) => (
          <GenreCard
            shadow
            genre={g}
            appearance={['small']}
            focus={focusedCandidate === j}
            onClick={() => {
              addGenreOrSubgenre(g);
            }}
            onKeyup={({ key }) => {
              if (key === 'Enter') {
                addGenreOrSubgenre(g);
              }
            }}
          />
        ))}
      </GenreCardList>
      <div className="scene-form__controls">
        {!equals(genreDefinitions, movie.genres) && <Button onClick={submit}>Submit</Button>}
      </div>
    </div>
  );
};
