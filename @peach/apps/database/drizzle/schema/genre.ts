import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  doublePrecision,
  index,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { Movie } from "./movie";
import { Settings } from "./settings";
import { Website } from "./website";

export const Genre = pgTable(
  "Genre",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    kinkiness: bigint("kinkiness", { mode: "number" }).notNull(),
    validAsRoot: boolean("validAsRoot").notNull(),
    validAsFetish: boolean("validAsFetish").notNull(),
    settingsId: bigint("settingsId", { mode: "number" }).references(() => Settings.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      name_key: uniqueIndex("Genre_name_key").using("btree", table.name),
    };
  }
);
export const GenreRelations = relations(Genre, ({ one, many }) => ({
  _Subgenres_A: many(_Subgenre, {
    relationName: "_Subgenre_A_Genre_id",
  }),
  _Subgenres_B: many(_Subgenre, {
    relationName: "_Subgenre_B_Genre_id",
  }),
  Setting: one(Settings, {
    fields: [Genre.settingsId],
    references: [Settings.id],
  }),
  Websites: many(Website),
  _GenreToMovies: many(_GenreToMovie),
}));

export const _Subgenre = pgTable(
  "_Subgenre",
  {
    A: bigint("A", { mode: "number" })
      .notNull()
      .references(() => Genre.id, { onDelete: "cascade", onUpdate: "cascade" }),
    B: bigint("B", { mode: "number" })
      .notNull()
      .references(() => Genre.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      AB_unique: uniqueIndex("_Subgenre_AB_unique").using("btree", table.A, table.B),
      B_idx: index().using("btree", table.B),
    };
  }
);
export const _SubgenreRelations = relations(_Subgenre, ({ one }) => ({
  Genre_A: one(Genre, {
    fields: [_Subgenre.A],
    references: [Genre.id],
    relationName: "_Subgenre_A_Genre_id",
  }),
  Genre_B: one(Genre, {
    fields: [_Subgenre.B],
    references: [Genre.id],
    relationName: "_Subgenre_B_Genre_id",
  }),
}));

export const GenreDefinition = pgTable("GenreDefinition", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  movieId: bigint("movieId", { mode: "number" })
    .notNull()
    .references(() => Movie.id, { onDelete: "restrict", onUpdate: "cascade" }),
  genre: text("genre").notNull(),
  timeStart: doublePrecision("timeStart").notNull(),
});
export const GenreDefinitionRelations = relations(GenreDefinition, ({ one }) => ({
  Movie: one(Movie, {
    fields: [GenreDefinition.movieId],
    references: [Movie.id],
  }),
}));

export const _GenreToMovie = pgTable(
  "_GenreToMovie",
  {
    A: bigint("A", { mode: "number" })
      .notNull()
      .references(() => Genre.id, { onDelete: "cascade", onUpdate: "cascade" }),
    B: bigint("B", { mode: "number" })
      .notNull()
      .references(() => Movie.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      AB_unique: uniqueIndex("_GenreToMovie_AB_unique").using("btree", table.A, table.B),
      B_idx: index().using("btree", table.B),
    };
  }
);
export const _GenreToMovieRelations = relations(_GenreToMovie, ({ one }) => ({
  Genre: one(Genre, {
    fields: [_GenreToMovie.A],
    references: [Genre.id],
  }),
  Movie: one(Movie, {
    fields: [_GenreToMovie.B],
    references: [Movie.id],
  }),
}));
