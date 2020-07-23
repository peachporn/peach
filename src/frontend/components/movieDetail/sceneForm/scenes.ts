import { last, path, prop, reverse, sortBy, uniqBy, update } from 'ramda';
import { SceneDraft, SceneGenre } from './types';

export const addScene = (s: SceneDraft) => (scenes: SceneDraft[]): SceneDraft[] => [...scenes, s];
export const removeScene = (s: SceneDraft) => (scenes: SceneDraft[]): SceneDraft[] =>
  scenes.filter(scene => scene.timeStart !== s.timeStart);

export const updateScene = (timeStart: number, updated: SceneDraft) => (
  scenes: SceneDraft[],
): SceneDraft[] => {
  const indexToUpdate = scenes.findIndex(s => s.timeStart === timeStart);
  console.log('Updating:');
  console.log(update(indexToUpdate, updated, scenes));

  return indexToUpdate === undefined ? scenes : update(indexToUpdate, updated, scenes);
};

const scenesSortedFromStart = (scenes: SceneDraft[]) => sortBy(prop('timeStart'), scenes);
const scenesSortedFromEnd = (scenes: SceneDraft[]) => reverse(scenesSortedFromStart(scenes));

export const mergeEndTimeToPreviousScene = (scene: SceneDraft) => (scenes: SceneDraft[]) => {
  const previousScene = scenesSortedFromEnd(scenes).find(s => s.timeStart < scene.timeStart);

  return !previousScene
    ? scenes
    : updateScene(previousScene.timeStart, { ...previousScene, timeEnd: scene.timeEnd })(scenes);
};

export const endPreviousScene = (time: number) => (scenes: SceneDraft[]) => {
  const previousScene = scenesSortedFromEnd(scenes).find(s => s.timeStart < time);

  return !previousScene
    ? scenes
    : updateScene(previousScene.timeStart, { ...previousScene, timeEnd: time })(scenes);
};

export const getCurrentScene = (time: number, scenes: SceneDraft[]) =>
  scenesSortedFromEnd(scenes).find(
    s => s.timeStart <= time && (s.timeEnd === undefined || s.timeEnd >= time),
  );

export const addGenre = (genre: SceneGenre, s: SceneDraft) =>
  !genre.validAsRoot
    ? s
    : {
        ...s,
        genres: uniqBy(path(['parent', 'id']), [
          ...(s.genres || []),
          {
            parent: genre,
            children: [],
          },
        ]),
      };

export const removeGenre = (genreId: number, s: SceneDraft) => ({
  ...s,
  genres: s.genres?.filter(g => g.parent.id !== genreId),
});

export const latestGenre = (s: SceneDraft) => (s.genres ? last(s.genres) : undefined);
