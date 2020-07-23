import { Fragment, FunctionalComponent, h, JSX } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import { equals, path } from 'ramda';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/components/button';
import { Input } from '../../../../components/components/input';
import { i } from '../../../i18n/i18n';
import { findGenreQuery } from '../../../queries/findGenre.gql';
import { GenreCard, GenreCardList } from '../../../../components/components/genreCard';
import { usePrevious } from '../../../utils/use-previous';
import { GenreClip, GenreClipList } from '../../../../components/components/genreClip';
import { Icon } from '../../../../components/components/icon';
import { SceneDraft, SceneGenre } from './types';
import {
  addGenre,
  addScene,
  endPreviousScene,
  getCurrentScene,
  latestGenre,
  mergeEndTimeToPreviousScene,
  removeGenre,
  removeScene,
  updateScene,
} from './scenes';
import { jumpToTime, pause, playPause, scrub } from './video';
import { addChildToGenreLink, removeChildFromGenreLink } from './genreLink';
import { updateScenesMutation } from '../../../mutations/updateScenes.gql';
import { throttle } from '../../../../utils/debounce';
import { DeleteSceneModal } from './deleteSceneModal';
import { isTouched } from '../../../utils/form';

type UnMaybe<T> = T extends undefined ? never : T;
export type SceneFormProps = {
  movie: UnMaybe<MovieQuery['movie']>;
  video: PropRef<HTMLVideoElement>;
};

const markerPosition = (duration: number, time: number) => (time / duration) * 100;

export const SceneForm: FunctionalComponent<SceneFormProps> = ({ movie, video }) => {
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
   *  SCENES */
  const [scenes, setScenes] = useState<SceneDraft[]>(movie.scenes);

  const currentScene = () => getCurrentScene(currentTime, scenes);
  const memoedCurrentScene = usePrevious(currentScene());

  const jumpToScene = (scene: SceneDraft) => {
    jumpToTime(scene.timeStart, video);
    setCurrentTime(scene.timeStart);
  };

  const [sceneToDelete, setSceneToDelete] = useState<SceneDraft | null>(null);

  /*
   *  FORM */
  const { register, watch, reset: resetForm } = useForm<{ genreName: string }>({
    defaultValues: { genreName: '' },
  });
  const genreName = watch('genreName');

  /*
   *  GENRE FOCUS */
  const [focusedGenre, focusGenre] = useState<SceneGenre | null>(null);
  useEffect(() => {
    const sceneHasChanged =
      memoedCurrentScene && memoedCurrentScene.timeStart !== currentScene()?.timeStart;

    const focusedGenreWasRemoved =
      currentScene() &&
      focusedGenre &&
      !currentScene()?.genres?.find(g => g.parent.id === focusedGenre.id);

    if (sceneHasChanged || focusedGenreWasRemoved) {
      focusGenre(null);
    }
  });
  /*
   *
   *  GENRE CANDIDATES */
  const { data } = useQuery<FindGenreQuery, FindGenreQueryVariables>(findGenreQuery, {
    skip: genreName?.length < 3,
    variables: {
      name: genreName || '',
    },
  });

  const genreCandidates = (data?.genres || []).filter(g =>
    !focusedGenre ? g.validAsRoot : focusedGenre.linkableChildren.map(x => x.id).includes(g.id),
  );

  /*
   *
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
   *  SCENE MANIPULATION: ADDING */
  const emptyScene = () => ({
    timeStart: !scenes.length ? 0 : currentTime,
    genres: [],
  });

  const newScene = () => {
    const s = emptyScene();
    setScenes(addScene(s)(endPreviousScene(s.timeStart)(scenes)));
  };

  const addGenreToCurrentScene = (genre: SceneGenre) => {
    const staticCurrentScene = currentScene();
    if (staticCurrentScene) {
      setScenes(
        updateScene(staticCurrentScene.timeStart, addGenre(genre, staticCurrentScene))(scenes),
      );
    } else {
      setScenes([addGenre(genre, emptyScene())]);
    }
    if (genre.linkableChildren.length > 0) {
      focusGenre(genre);
    }
    reset();
  };

  const addSubgenreToGenreInCurrentScene = (genre: SceneGenre, parentId?: number) => {
    const staticCurrentScene = currentScene();
    const idToAdd = parentId || (staticCurrentScene && latestGenre(staticCurrentScene)?.parent.id);

    if (!idToAdd || !staticCurrentScene) {
      return;
    }

    const updated = {
      ...staticCurrentScene,
      genres: addChildToGenreLink(idToAdd, genre)(staticCurrentScene.genres || []),
    };

    setScenes(updateScene(staticCurrentScene.timeStart, updated)(scenes));
    reset();
  };

  const addGenreOrSubgenre = (genre: SceneGenre) => {
    if (focusedGenre) {
      addSubgenreToGenreInCurrentScene(genre, focusedGenre.id);
    } else {
      addGenreToCurrentScene(genre);
    }
    focusTextInput();
  };

  /*
   *
   *  SCENE MANIPULATION: REMOVING */

  const removeSubgenreFromGenre = (parentId: number, childId: number) => {
    const staticCurrentScene = currentScene();
    if (!staticCurrentScene) {
      return;
    }

    const updated = {
      ...staticCurrentScene,
      genres: removeChildFromGenreLink(parentId, childId)(staticCurrentScene.genres || []),
    };
    setScenes(updateScene(staticCurrentScene.timeStart, updated)(scenes));
  };

  const removeGenreFromCurrentScene = (genre: SceneGenre) => {
    const staticCurrentScene = currentScene();
    if (staticCurrentScene) {
      focusGenre(null);
      setScenes(
        updateScene(
          staticCurrentScene.timeStart,
          removeGenre(genre.id, staticCurrentScene),
        )(scenes),
      );
    }
    reset();
  };

  const deleteScene = (scene: SceneDraft) => {
    setScenes(removeScene(scene)(mergeEndTimeToPreviousScene(scene)(scenes)));
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
      if (shiftKey) {
        newScene();
        return;
      }
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

  const [save] = useMutation<UpdateScenesMutation, UpdateScenesMutationVariables>(
    updateScenesMutation,
  );
  const submit = () => {
    save({
      variables: {
        movieId: movie.id,
        scenes: scenes.map(s => ({
          timeStart: s.timeStart,
          timeEnd: s.timeEnd || duration,
          genres: (s.genres || []).map(g => ({
            parent: g.parent.id,
            children: g.children.map(c => c.id),
          })),
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
        <DeleteSceneModal
          closeModal={() => {
            setSceneToDelete(null);
          }}
          modalOpen={!!sceneToDelete}
          onDelete={() => {
            if (sceneToDelete) {
              deleteScene(sceneToDelete);
            }
          }}
        />
        {scenes.map((scene, j) => (
          <span
            tabIndex={0}
            role="button"
            onClick={() => {
              jumpToScene(scene);
            }}
            className={`scene-view__marker ${
              currentScene()?.timeStart === scene.timeStart ? 'scene-view__marker--current' : ''
            }`.trim()}
            style={{
              left: `${markerPosition(duration, scene.timeStart)}%`,
              width: `${
                markerPosition(duration, scene.timeEnd || duration) -
                markerPosition(duration, scene.timeStart)
              }%`,
            }}
          >
            {j > 0 && (
              <Icon
                className="scene-view__delete"
                icon="close"
                onClick={() => {
                  setSceneToDelete(scene);
                }}
              />
            )}
            <GenreClipList>
              {(scene.genres || []).map(g => (
                <GenreClip
                  shadow
                  genre={g.parent}
                  focus={
                    currentScene()?.timeStart === scene.timeStart &&
                    focusedGenre?.id === g.parent.id
                  }
                  interactionSlot={
                    <Fragment>
                      {g.children.map(c => (
                        <GenreClip
                          genre={c}
                          appearance="tiny"
                          onClick={e => {
                            e.stopPropagation();
                            removeSubgenreFromGenre(g.parent.id, c.id);
                          }}
                        />
                      ))}
                      <Icon
                        icon="close"
                        onClick={() => {
                          removeGenreFromCurrentScene(g.parent);
                        }}
                      />
                    </Fragment>
                  }
                  onClick={e => {
                    e.stopPropagation();
                    jumpToScene(scene);
                    if (focusedGenre && focusedGenre.id === g.parent.id) {
                      focusGenre(null);
                    } else {
                      focusGenre(g.parent);
                    }
                  }}
                />
              ))}
            </GenreClipList>
          </span>
        ))}
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
            appearance="small"
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
        {!equals(scenes, movie.scenes) && <Button onClick={submit}>Submit</Button>}
      </div>
    </div>
  );
};
