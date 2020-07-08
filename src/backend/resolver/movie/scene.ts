import { PrismaClient, Scene as DBScene } from '@prisma/client';
import { uniq } from 'ramda';
import {
  genreIdsForGenreLink,
  GenreLink,
  GenreLinkRaw,
  resolveGenreLink,
} from '../../../domain/movie/scene';
import { transformBaseGenre } from '../../transformers/genre';

export const resolveScene = (prisma: PrismaClient) => async (scene: DBScene): Promise<Scene> => {
  const genreLinks = JSON.parse(scene.genres) as GenreLinkRaw[];

  const genreIds = uniq(genreLinks.flatMap(genreIdsForGenreLink));

  const genres = await prisma.genre
    .findMany({
      where: {
        id: {
          in: genreIds,
        },
      },
    })
    .then(gs => gs.map(transformBaseGenre));

  const resolvedLinks = genreLinks.map(resolveGenreLink(genres));

  return {
    id: scene.id,
    timeStart: scene.timeStart,
    timeEnd: scene.timeEnd,
    genres: resolvedLinks.filter(l => l !== undefined) as GenreLink[],
  };
};
