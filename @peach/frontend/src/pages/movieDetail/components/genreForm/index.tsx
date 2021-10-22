import { FunctionalComponent, h, JSX } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import { equals, path } from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  FindGenreQuery,
  FindGenreQueryVariables,
  GenreActionCardFragment,
  GenreCategory,
  MovieDetailFragment,
  UpdateGenreDefinitionsMutation,
  UpdateGenreDefinitionsMutationVariables,
} from '@peach/types';
import { updateGenreDefinitionsMutation } from '../../mutations/updateGenreDefinitions.gql';
import { i, I18nKey } from '../../../../i18n/i18n';
import { findGenreQuery } from '../../queries/findGenre.gql';
import { GenreClip } from '../../../../components/genreClip';
import { Icon } from '../../../../components/icon';
import { throttle } from '../../../../utils/throttle';
import { GenreDefinitionDraft } from './types';
import { jumpToTime, pause, playPause, scrub } from './video';
import { removeChildFromGenreDefinition } from './genreLink';
import {
  Action,
  addChild,
  createAddChildAction,
  createDuplicateAction,
  createStartAction,
  executeAction,
  possibleActionTypes,
} from './action';
import { buildGenreGrid, DisplayableGenre } from './display';
import { GenreActionCard } from './genreActionCard';
import { GenreFormPreviewDrawer } from './previewDrawer';

export type GenreFormProps = {
  movie: MovieDetailFragment;
  video: PropRef<HTMLVideoElement>;
  onSubmit?: () => {};
};

export const GenreForm: FunctionalComponent<GenreFormProps> = ({ movie, video, onSubmit }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

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

  useEffect(() => {
    setGenreDefinitions(movie.genres);
  }, [movie.genres]);

  /*
   *  FORM */
  const {
    register,
    watch,
    reset: resetForm,
  } = useForm<{ genreName: string }>({
    defaultValues: { genreName: '' },
  });
  const genreName = watch('genreName');

  /*
   *  GENRE FOCUS */
  const [lastAction, setLastAction] = useState<Action | null>(null);
  const [focusedGenre, focusGenre] = useState<GenreDefinitionDraft | null>(null);

  useEffect(() => {
    if (lastAction && lastAction.type === 'START') {
      const g = genreDefinitions[genreDefinitions.length - 1];
      if (g.genre.parent.linkableChildren.length > 0) {
        focusGenre(g);
      }
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
    skip: genreName.trim() === '',
    variables: {
      name: genreName.trim() || '',
    },
  });

  const possibleActions = (genre: GenreActionCardFragment) => {
    const actionTypes = possibleActionTypes(genre, genreDefinitions, focusedGenre || undefined);

    return actionTypes.map(a => {
      if (a === 'START') {
        return createStartAction({ genre, time: currentTime });
      }

      if (a === 'DUPLICATE' && focusedGenre) {
        return createDuplicateAction({ genre: focusedGenre, time: currentTime });
      }

      if (a === 'ADD_CHILD' && focusedGenre) {
        return createAddChildAction({ genre, parent: focusedGenre });
      }

      return null;
    });
  };

  const actions = (data?.genres || []).flatMap(possibleActions).slice(0, 5);

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
  const textInput = useRef<HTMLInputElement | null>();
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
  const handleKey = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const { key, ctrlKey, metaKey, altKey, shiftKey } = e;

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
          genre: {
            parent: g.genre.parent.id,
            children: g.genre.children.map(c => c.id),
          },
        })),
      },
    }).then(() => {
      reset();
      if (onSubmit) {
        onSubmit();
      }
    });
  };

  const categories: GenreCategory[] = [
    'Practice',
    'Position',
    'Location',
    'Clothing',
    'Film',
    'Feature',
  ];

  const renderGenreFormClip = (genreDefinition: DisplayableGenre | GenreDefinitionDraft) => (
    <GenreClip
      size="12"
      style={
        !('gridColumnStart' in genreDefinition)
          ? {}
          : {
              gridColumnStart: genreDefinition.gridColumnStart?.toString(),
              gridColumnEnd: `span ${genreDefinition.gridColumnSpan}`,
            }
      }
      key={genreDefinition.genre.parent.id}
      genre={genreDefinition.genre.parent}
      focus={
        focusedGenre?.timeStart === genreDefinition.timeStart &&
        focusedGenre.genre.parent.id === genreDefinition.genre.parent.id
      }
      descriptionSlot={<span>{genreDefinition.genre.parent.name}</span>}
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
          return;
        }

        focusGenre(genreDefinition);
      }}
    >
      {genreDefinition.genre.children.length === 0 ? null : (
        <div className="flex self-end">
          {genreDefinition.genre.children.map(c => (
            <GenreClip
              size="8"
              key={c.id}
              genre={c}
              descriptionSlot={<span>{c.name}</span>}
              onClick={e => {
                e.stopPropagation();
                removeSubgenreFromGenre(genreDefinition, c.id);
              }}
            />
          ))}
        </div>
      )}
    </GenreClip>
  );

  const genreGrid = (category?: GenreCategory) =>
    buildGenreGrid(
      duration,
      genreDefinitions.filter(g => (!category ? true : g.genre.parent.category === category)),
    );

  return !expanded ? (
    <GenreFormPreviewDrawer genreGrid={genreGrid()} expanded={expanded} setExpanded={setExpanded} />
  ) : (
    <div className="bg-white w-full">
      <div className="grid w-full max-w-screen-xl mx-auto overflow-x-auto gap-4 -mb-0.5 p-2">
        {categories.map(
          category =>
            genreDefinitions.filter(g => g.genre.parent.category === category).length > 0 && (
              <span className="flex relative h-full h-14">
                <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-200 pr-2">
                  {i(`GENRE_CATEGORY_${category.toUpperCase()}` as I18nKey)}
                </span>
                <div className="grid grid-cols-100 relative grid-flow-row-dense w-full gap-y-4">
                  <span className="absolute w-full h-1/2 top-0 z-0 border-b border-dashed border-gray-200" />
                  {genreGrid(category).map(renderGenreFormClip)}
                </div>
              </span>
            ),
        )}
      </div>
      <input
        name="genreName"
        className="w-full bg-white p-3 border-b border-gray-200 focus:border-pink focus:outline-none"
        onKeyDown={handleKey}
        ref={e => {
          textInput.current = e;
          register(e);
        }}
        placeholder={i('SCENE_FORM_PLACEHOLDER')}
      />
      <div className="flex gap-2 py-2 px-4 bg-gray-50 h-32 place-items-start -mt-0.5">
        {actions.map(
          (a, j) =>
            a && (
              <GenreActionCard
                key={`${a.type}${
                  'name' in a.props.genre ? a.props.genre.id : a.props.genre.genre.parent.id
                }`}
                genre={'name' in a.props.genre ? a.props.genre : a.props.genre.genre.parent}
                focus={focusedAction === j}
                headline={
                  'name' in a.props.genre ? a.props.genre.name : a.props.genre.genre.parent.name
                }
                onClick={() => {
                  submitAction(a);
                  focusTextInput();
                }}
                onKeyUp={({ key }) => {
                  if (key === 'Enter') {
                    submitAction(a);
                    focusTextInput();
                  }
                }}
              />
            ),
        )}
      </div>
      {!equals(genreDefinitions, movie.genres) && (
        <div className="py-2 flex justify-center bg-white">
          <button className="w-full md:w-80 bg-pink text-white py-1 px-2 rounded" onClick={submit}>
            <Icon icon="check" />{' '}
          </button>
        </div>
      )}
      <div
        className="bg-white w-full flex justify-center py-2 -mt-0.5 shadow"
        tabIndex={0}
        role="button"
        onClick={() => {
          setExpanded(false);
        }}
      >
        <Icon icon="expand_less" className="text-gray-200 w-4" />
      </div>
    </div>
  );
};
