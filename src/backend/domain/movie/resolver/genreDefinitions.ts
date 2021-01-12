import { PrismaClient, GenreDefinition as DBGenreDefinition } from '@prisma/client';
import {
  genreIdsForGenreLink,
  GenreLinkRaw,
  resolveGenreLink,
} from '../../../../domain/movie/genreDefinition';
import { transformGenre } from '../../genre/transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';

export const serializeGenreDefinitionGenre = (genreLinks: GenreLinkRaw) =>
  JSON.stringify(genreLinks);

export const deserializeGenreDefinitionGenre = (json: string) => JSON.parse(json) as GenreLinkRaw;

const resolveGenreDefinition = (prisma: PrismaClient) => async (
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
      include: {
        linkableChildren: true,
        linkableParents: true,
      },
    })
    .then(gs => gs.map(transformGenre));

  return {
    id: genreDefinition.id,
    timeStart: genreDefinition.timeStart,
    genre: resolveGenreLink(genres)(genreLink) as GenreLink,
  };
};

export const genreDefinitionsResolvers: Resolvers = {
  Movie: {
    genres: (parent, _args, { prisma }) =>
      prisma.genreDefinition
        .findMany({
          where: {
            movieId: parent.id,
          },
        })
        .then(genreDefinitions => genreDefinitions.map(resolveGenreDefinition(prisma))),
  },
};
