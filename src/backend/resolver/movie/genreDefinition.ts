import { PrismaClient, GenreDefinition as DBGenreDefinition } from '@prisma/client';
import { chain } from 'ramda';
import {
  genreIdsForGenreLink,
  GenreLink,
  GenreLinkRaw,
  resolveGenreLink,
} from '../../../domain/movie/genreDefinition';
import { transformBaseGenre } from '../../transformers/genre';

export const serializeGenreDefinitionGenre = (genreLinks: GenreLinkRaw) =>
  JSON.stringify(genreLinks);
export const deserializeGenreDefinitionGenre = (json: string) => JSON.parse(json) as GenreLinkRaw;

export const resolveGenreDefinition = (prisma: PrismaClient) => async (
  genreDefinition: DBGenreDefinition,
): Promise<GenreDefinition> => {
  const genreLink = deserializeGenreDefinitionGenre(genreDefinition.genre) || [];

  const genreIds = genreIdsForGenreLink(genreLink);

  const genres = await prisma.genre
    .findMany({
      where: {
        id: {
          in: genreIds,
        },
      },
    })
    .then(gs => gs.map(transformBaseGenre));

  return {
    id: genreDefinition.id,
    timeStart: genreDefinition.timeStart,
    timeEnd: genreDefinition.timeEnd,
    genre: resolveGenreLink(genres)(genreLink) as GenreLink,
  };
};
