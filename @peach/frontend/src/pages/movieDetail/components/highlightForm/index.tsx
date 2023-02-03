import { useQuery } from '@apollo/client';
import { FindGenreQuery, FindGenreQueryVariables, GenreActionCardFragment } from '@peach/types';
import { FunctionalComponent, h, JSX } from 'preact';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import { i } from '../../../../i18n/i18n';
import { throttle } from '../../../../utils/throttle';
import { usePrevious } from '../../../../utils/usePrevious';
import { MovieHighlightForm } from '../../hooks/useMovieHighlightForm';
import { findGenreQuery } from '../../queries/findGenre.gql';
import {
  Action,
  createAddChildAction,
  createDuplicateAction,
  createStartAction,
  executeAction,
  possibleActionTypes,
} from './action';
import { GenreActionCard } from './genreActionCard';
import { GenreFormClip } from './genreFormClip';
import { GenreGrid } from './genreGrid';
import { GenreDefinitionDraft } from './types';
import { pause, playPause, scrub } from './video';

export type HighlightFormProps = {
  form: MovieHighlightForm;
  genreDefinitions: GenreDefinitionDraft[];
  setGenreDefinitions: (genreDefinition: GenreDefinitionDraft[]) => void;
  video: PropRef<HTMLVideoElement | undefined>;
};

export const HighlightForm: FunctionalComponent<HighlightFormProps> = ({
  video,
  form,
  genreDefinitions,
  setGenreDefinitions,
}) => {
  const genreName = form.watch('genreName');
  const [currentTime, setCurrentTime] = useState(0);

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
  const { data: queryData, loading } = useQuery<FindGenreQuery, FindGenreQueryVariables>(
    findGenreQuery,
    {
      skip: genreName.trim() === '',
      notifyOnNetworkStatusChange: false,
      variables: {
        name: genreName.trim() || '',
      },
    },
  );
  const previousData = usePrevious(queryData);
  const data = loading ? previousData : queryData;

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

  const actions = (data?.genres.genres || []).flatMap(possibleActions).slice(0, 5);

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
    form.reset();
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

  return (
    <div className="bg-white w-full">
      <GenreGrid
        genreDefinitions={genreDefinitions}
        setGenreDefinitions={setGenreDefinitions}
        video={video}
        focusedGenre={focusedGenre}
        focusGenre={focusGenre}
        form={form}
        ClipComponent={GenreFormClip}
      />
      <input
        name="genreName"
        className="w-full bg-white p-3 border-b border-gray-200 focus:border-pink focus:outline-none"
        onKeyDown={handleKey}
        ref={e => {
          textInput.current = e;
          form.register(e);
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
    </div>
  );
};
