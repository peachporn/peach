import { PrismaClient, GenreDefinition as DBGenreDefinition } from '@peach/utils';
import { genreIdsForGenreLink, GenreLinkRaw, resolveGenreLink } from '@peach/domain';
import { GenreDefinition, GenreLink } from '@peach/types';
import { transformGenre } from '../../genre/transformer/genre';
import { Resolvers } from '../../../generated/resolver-types';
import { transformMovie } from '../transformer/movie';

export const serializeGenreDefinitionGenre = (genreLinks: GenreLinkRaw) =>
  JSON.stringify(genreLinks);

export const deserializeGenreDefinitionGenre = (json: string) => JSON.parse(json) as GenreLinkRaw;

const resolveGenreDefinition =
  (prisma: PrismaClient) =>
  async (genreDefinition: DBGenreDefinition): Promise<GenreDefinition> => {
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
  Mutation: {
    updateGenreDefinitions: async (_parent, { movieId, genreDefinitions }, { prisma }) => {
      const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: {
          genres: true,
        },
      });

      const movieGenres = !movie ? [] : movie.genres;

      await prisma.genreDefinition.deleteMany({
        where: {
          id: {
            in: movieGenres.map(g => g.id),
          },
        },
      });

      await prisma.movie.update({
        where: {
          id: movieId,
        },
        data: {
          genres: {
            create: genreDefinitions.map(genreDefinition => ({
              timeStart: genreDefinition.timeStart,
              genre: serializeGenreDefinitionGenre(genreDefinition.genre as GenreLinkRaw),
            })),
          },
        },
      });

      return prisma.movie
        .findUnique({
          where: { id: movieId },
          include: {
            genres: true,
          },
        })
        .then(m => (m ? transformMovie(m) : undefined));
    },
  },
};
