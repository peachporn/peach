import { adjust, uniqBy, prop } from 'ramda';
import { DefinableGenre, GenreDefinitionDraft } from './types';
import { i, I18nKey } from '../../../i18n/i18n';

type StartAction = {
  type: 'START';
  props: {
    genre: DefinableGenre;
    time: number;
  };
};

type EndAction = {
  type: 'END';
  props: {
    genre: DefinableGenre;
    time: number;
  };
};

type ChangeAction = {
  type: 'CHANGE';
  props: EndAction['props'] & StartAction['props'];
};

type AddChildAction = {
  type: 'ADD_CHILD';
  props: {
    genre: DefinableGenre;
    parent: GenreDefinitionDraft;
  };
};

type SetFullLengthAction = {
  type: 'SET_FULLLENGTH';
  props: {
    genre: DefinableGenre;
    duration: number;
  };
};

export type Action = StartAction | EndAction | ChangeAction | AddChildAction | SetFullLengthAction;

type ActionProps = Action['props'];
type ActionType = Action['type'];

type ActionExecutor<A extends ActionProps> = (
  props: A,
) => (genreDefinitions: GenreDefinitionDraft[]) => GenreDefinitionDraft[];

export const actionsByCategory: { [key in GenreCategory]?: ActionType[] } = {
  Position: ['START', 'CHANGE'],
  Location: ['START', 'CHANGE'],
  Clothing: ['START', 'END'],
  Practice: ['START', 'END', 'CHANGE', 'ADD_CHILD'],
  Film: ['START', 'END', 'SET_FULLLENGTH'],
  Feature: ['START', 'END', 'SET_FULLLENGTH'],
  BodyPart: ['ADD_CHILD'],
};

export const createStartAction = (props: StartAction['props']): Action => ({
  type: 'START',
  props,
});
export const start: ActionExecutor<StartAction['props']> = ({
  genre,
  time,
}) => genreDefinitions => [
  ...genreDefinitions,
  {
    timeStart: time,
    genre: {
      parent: genre,
      children: [],
    },
  },
];

export const createEndAction = (props: EndAction['props']): Action => ({
  type: 'END',
  props,
});
export const end: ActionExecutor<EndAction['props']> = ({ genre, time }) => genreDefinitions => {
  const shouldEnd = (g: GenreDefinitionDraft) =>
    g.genre.parent.category === genre.category && g.timeEnd === undefined;

  return genreDefinitions.map(g => {
    if (shouldEnd(g)) {
      return {
        ...g,
        timeEnd: time,
      };
    }
    return g;
  });
};

export const createChangeAction = (props: ChangeAction['props']): Action => ({
  type: 'CHANGE',
  props,
});
export const change: ActionExecutor<ChangeAction['props']> = props => genreDefinitions =>
  start(props)(end(props)(genreDefinitions));

export const createAddChildAction = (props: AddChildAction['props']): Action => ({
  type: 'ADD_CHILD',
  props,
});

export const addChild: ActionExecutor<AddChildAction['props']> = ({
  genre,
  parent,
}) => genreDefinitions => {
  const indexToUpdate = genreDefinitions.findIndex(
    g => g.timeStart === parent.timeStart && g.genre.parent.id === parent.genre.parent.id,
  );

  return indexToUpdate === undefined
    ? genreDefinitions
    : adjust(
        indexToUpdate,
        g => ({
          ...g,
          genre: {
            ...g.genre,
            children: uniqBy(
              prop('id'),
              g.genre.parent.linkableChildren.find(c => c.id === genre.id)
                ? [...g.genre.children, genre]
                : g.genre.children,
            ),
          },
        }),
        genreDefinitions,
      );
};

export const createSetFullLengthAction = (props: SetFullLengthAction['props']): Action => ({
  type: 'SET_FULLLENGTH',
  props,
});
export const setFullLength: ActionExecutor<SetFullLengthAction['props']> = ({
  genre,
  duration,
}) => genreDefinitions => [
  ...genreDefinitions,
  {
    timeStart: 0,
    timeEnd: duration,
    genre: {
      parent: genre,
      children: [],
    },
  },
];

export const possibleActionTypes = (
  genre: DefinableGenre,
  genreDefinitions: GenreDefinitionDraft[],
  focusedGenre?: GenreDefinitionDraft,
): ActionType[] => {
  const actions = actionsByCategory[genre.category] || [];

  const isValidChild =
    focusedGenre && focusedGenre.genre.parent.linkableChildren.map(c => c.id).includes(genre.id);

  return actions.filter(a => {
    if (a === 'ADD_CHILD') {
      return isValidChild;
    }

    if (a === 'START') {
      return true;
    }
    return false;
  });
};

export const printAction = (action: Action): string => {
  const i18nKey = `ACTION_${action.props.genre.category.toUpperCase()}_${action.type}` as I18nKey;
  return i(i18nKey, {
    genre: action.props.genre.name,
    parent: 'parent' in action.props ? action.props.parent.genre.parent.name : '',
  });
};

export const executeAction = (
  action: Action,
  genreDefinitions: GenreDefinitionDraft[],
): GenreDefinitionDraft[] => {
  const executor =
    action.type === 'START'
      ? start(action.props)
      : action.type === 'END'
      ? end(action.props)
      : action.type === 'CHANGE'
      ? change(action.props)
      : action.type === 'ADD_CHILD'
      ? addChild(action.props)
      : action.type === 'SET_FULLLENGTH'
      ? setFullLength(action.props)
      : null;

  if (!executor) {
    return genreDefinitions;
  }

  return executor(genreDefinitions);
};
