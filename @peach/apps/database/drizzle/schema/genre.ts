import { relations } from "drizzle-orm";
import { bigint, doublePrecision, index, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { movie } from "./movie";
import { website } from "./website";

export const genre = pgTable(
  "genre",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    kinkiness: bigint("kinkiness", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex("genre_name_key").using("btree", table.name),
    };
  }
);
export const genreRelations = relations(genre, ({ many }) => ({
  websites: many(website),
  movieGenres: many(movieGenres),
}));

export const genreDefinition = pgTable("genreDefinition", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  movieId: bigint("movieId", { mode: "number" })
    .notNull()
    .references(() => movie.id, { onDelete: "restrict", onUpdate: "cascade" }),
  genre: text("genre").notNull(),
  timeStart: doublePrecision("timeStart").notNull(),
});
export const genreDefinitionRelations = relations(genreDefinition, ({ one }) => ({
  movie: one(movie, {
    fields: [genreDefinition.movieId],
    references: [movie.id],
  }),
}));

export const movieGenres = pgTable(
  "movieGenres",
  {
    genreId: bigint("genreId", { mode: "number" })
      .notNull()
      .references(() => genre.id, { onDelete: "cascade", onUpdate: "cascade" }),
    movieId: bigint("movieId", { mode: "number" })
      .notNull()
      .references(() => movie.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      genreIdMovieId_unique: uniqueIndex("movieGenres_genreIdMovieId_unique").using(
        "btree",
        table.genreId,
        table.movieId
      ),
      movieId_idx: index().using("btree", table.movieId),
    };
  }
);
export const movieGenresRelations = relations(movieGenres, ({ one }) => ({
  genre: one(genre, {
    fields: [movieGenres.genreId],
    references: [genre.id],
  }),
  movie: one(movie, {
    fields: [movieGenres.movieId],
    references: [movie.id],
  }),
}));
