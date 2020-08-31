import { FunctionalComponent, h, JSX } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import { equals, path } from 'ramda';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/components/button';
import { Input } from '../../../../components/components/input';
import { i, I18nKey } from '../../../i18n/i18n';
import { findGenreQuery } from '../../../queries/findGenre.gql';
import { GenreCard, GenreCardList } from '../../../../components/components/genreCard';
import { GenreClip } from '../../../../components/components/genreClip';
import { Icon } from '../../../../components/components/icon';
import { GenreDefinitionDraft, DefinableGenre } from './types';
import { jumpToTime, pause, playPause, scrub } from './video';
import { removeChildFromGenreDefinition } from './genreLink';
import { throttle } from '../../../../utils/debounce';
import { isTouched } from '../../../utils/form';
import { Text } from '../../../../components/components/text';
import { updateGenreDefinitionsMutation } from '../../../mutations/updateGenreDefinitions.gql';
import {
  Action,
  addChild,
  change,
  createAddChildAction,
  createChangeAction,
  createEndAction,
  createSetFullLengthAction,
  createStartAction,
  executeAction,
  possibleActionTypes,
  printAction,
  setFullLength,
} from './action';
import { buildGenreGrid } from './display';

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
  const [lastAction, setLastAction] = useState<Action | null>(null);
  const [focusedGenre, focusGenre] = useState<GenreDefinitionDraft | null>(null);

  useEffect(() => {
    if (lastAction && lastAction.type === 'START') {
      focusGenre(genreDefinitions[genreDefinitions.length - 1]);
    }
  }, [lastAction]);

  useEffect(() => {
    const focusedGenreWasRemoved =
      focusedGenre && !genreDefinitions.find(g => g.timeStart === focusedGenre.timeStart);

    if (focusedGenreWasRemoved) {
      focusGenre(null);
    }
  });

  /*
   *  ACTIONS */
  const { data } = useQuery<FindGenreQuery, FindGenreQueryVariables>(findGenreQuery, {
    skip: genreName === '',
    variables: {
      name: genreName || '',
    },
  });

  const possibleActions = (genre: DefinableGenre) => {
    const actionTypes = possibleActionTypes(genre, genreDefinitions, focusedGenre || undefined);
    console.log(actionTypes);

    return actionTypes.map(a => {
      if (a === 'START') {
        return createStartAction({ genre, time: currentTime });
      }

      if (a === 'END') {
        return createEndAction({ genre, time: currentTime });
      }

      if (a === 'CHANGE') {
        return createChangeAction({ genre, time: currentTime });
      }

      if (a === 'SET_FULLLENGTH') {
        return createSetFullLengthAction({ genre, duration });
      }

      if (a === 'ADD_CHILD' && focusedGenre) {
        return createAddChildAction({ genre, parent: focusedGenre });
      }

      return null;
    });
  };

  const actions = (data?.genres || []).flatMap(possibleActions);

  /*
   *  ACTION FOCUS */
  const [focusedAction, focusAction] = useState<number | null>(null);

  const focusNextAction = () => {
    focusAction(
      focusedAction === null || focusedAction === actions.length - 1 ? 0 : focusedAction + 1,
    );
  };

  const focusPreviousCandidate = () => {
    focusAction(
      focusedAction === null || focusedAction === 0 ? actions.length - 1 : focusedAction - 1,
    );
  };

  const reset = () => {
    resetForm();
    focusAction(null);
  };

  const submitAction = (action: Action) => {
    setGenreDefinitions(executeAction(action, genreDefinitions));
    setLastAction(action);
    reset();
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
   *  REMOVING */
  const removeSubgenreFromGenre = (genreDefinition: GenreDefinitionDraft, childId: number) => {
    setGenreDefinitions(removeChildFromGenreDefinition(genreDefinition, childId)(genreDefinitions));
  };

  const removeGenreDefinition = (genre: GenreDefinitionDraft) => {
    focusGenre(null);
    setGenreDefinitions(
      genreDefinitions.filter(
        g => !(g.timeStart === genre.timeStart && g.genre.parent.id === genre.genre.parent.id),
      ),
    );
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

    if (key === 'ArrowUp' && actions.length) {
      focusNextAction();
      return;
    }

    if (key === 'ArrowDown' && actions.length) {
      focusPreviousCandidate();
      return;
    }

    if (key === 'Enter') {
      const actionToExecute = focusedAction ? actions[focusedAction] : actions[0];
      if (actionToExecute) {
        submitAction(actionToExecute);
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
        {['Practice', 'Location', 'Clothing', 'Position', 'Film', 'Feature'].map(
          category =>
            genreDefinitions.filter(g => g.genre.parent.category === category).length > 0 && (
              <span className="scene-view__marker">
                <span className="scene-view__title">
                  {i(`GENRE_CATEGORY_${category.toUpperCase()}` as I18nKey)}
                </span>
                <div className="scene-view__track">
                  {buildGenreGrid(
                    duration,
                    genreDefinitions.filter(g => g.genre.parent.category === category),
                  ).map(genreDefinition => (
                    <GenreClip
                      style={{
                        gridColumnStart: genreDefinition.gridColumnStart.toString(),
                        gridColumnEnd: `span ${genreDefinition.gridColumnSpan}`,
                      }}
                      key={genreDefinition.genre.parent.id}
                      genre={genreDefinition.genre.parent}
                      focus={
                        focusedGenre?.timeStart === genreDefinition.timeStart &&
                        focusedGenre.genre.parent.id === genreDefinition.genre.parent.id
                      }
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
                      onDblClick={e => {
                        e.stopPropagation();
                        jumpToTime(genreDefinition.timeStart, video);
                      }}
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
                </div>
              </span>
            ),
        )}
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
      <GenreCardList className="scene-form__actions">
        {actions.map(
          (a, j) =>
            a && (
              <GenreCard
                shadow
                genre={a.props.genre}
                focus={focusedAction === j}
                headline={printAction(a)}
                categorySlot={null}
                onClick={() => {
                  submitAction(a);
                  focusTextInput();
                }}
                onKeyup={({ key }) => {
                  if (key === 'Enter') {
                    submitAction(a);
                    focusTextInput();
                  }
                }}
              />
            ),
        )}
      </GenreCardList>
      <div className="scene-form__controls">
        {!equals(genreDefinitions, movie.genres) && <Button onClick={submit}>Submit</Button>}
      </div>
    </div>
  );
};
