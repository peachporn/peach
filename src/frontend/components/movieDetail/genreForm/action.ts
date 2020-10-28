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

type DuplicateAction = {
  type: 'DUPLICATE';
  props: {
    genre: GenreDefinitionDraft;
    time: number;
  };
};

type AddChildAction = {
  type: 'ADD_CHILD';
  props: {
    genre: DefinableGenre;
    parent: GenreDefinitionDraft;
  };
};

export type Action = StartAction | DuplicateAction | AddChildAction;

type ActionProps = Action['props'];
type ActionType = Action['type'];

type ActionExecutor<A extends ActionProps> = (
  props: A,
) => (genreDefinitions: GenreDefinitionDraft[]) => GenreDefinitionDraft[];

export const actionsByCategory: { [key in GenreCategory]?: ActionType[] } = {
  Position: ['START'],
  Location: ['START'],
  Clothing: ['START'],
  Practice: ['START', 'DUPLICATE', 'ADD_CHILD'],
  Film: ['START'],
  Feature: ['START'],
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

export const createDuplicateAction = (props: DuplicateAction['props']): Action => ({
  type: 'DUPLICATE',
  props,
});
export const duplicate: ActionExecutor<DuplicateAction['props']> = ({
  genre,
  time,
}) => genreDefinitions => [
  ...genreDefinitions,
  {
    timeStart: time,
    genre: genre.genre,
  },
];

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

export const possibleActionTypes = (
  genre: DefinableGenre,
  genreDefinitions: GenreDefinitionDraft[],
  focusedGenre?: GenreDefinitionDraft,
): ActionType[] => {
  const actions = actionsByCategory[genre.category] || [];

  const isValidChild =
    focusedGenre && focusedGenre.genre.parent.linkableChildren.map(c => c.id).includes(genre.id);

  const isSameGenreFocused = focusedGenre && focusedGenre.genre.parent.id === genre.id;

  return actions.filter(a => {
    if (a === 'ADD_CHILD') {
      return isValidChild;
    }

    if (a === 'START') {
      return true;
    }

    if (a === 'DUPLICATE') {
      return isSameGenreFocused;
    }

    return false;
  });
};

export const printAction = (action: Action): string => {
  const category =
    'category' in action.props.genre ? `_${action.props.genre.category.toUpperCase()}` : '';
  const type = `_${action.type}`;

  const i18nKey = `ACTION${category}${type}` as I18nKey;

  return i(i18nKey, {
    genre:
      'name' in action.props.genre ? action.props.genre.name : action.props.genre.genre.parent.name,
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
      : action.type === 'ADD_CHILD'
      ? addChild(action.props)
      : action.type === 'DUPLICATE'
      ? duplicate(action.props)
      : null;

  if (!executor) {
    return genreDefinitions;
  }

  return executor(genreDefinitions);
};
