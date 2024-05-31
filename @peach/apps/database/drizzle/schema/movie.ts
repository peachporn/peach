import { relations } from "drizzle-orm";
import { bigint, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { _ActressToMovie } from "./actress";
import { GenreDefinition, _GenreToMovie } from "./genre";
import { MovieMetadata } from "./metadata";
import { Volume } from "./volume";
import { Website } from "./website";

export const Movie = pgTable(
  "Movie",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    title: text("title").notNull(),
    actors: bigint("actors", { mode: "number" }).default(0).notNull(),
    cover: bigint("cover", { mode: "number" }).default(3).notNull(),
    websiteId: bigint("websiteId", { mode: "number" }).references(() => Website.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    path: text("path").notNull(),
    volumeId: bigint("volumeId", { mode: "number" })
      .notNull()
      .references(() => Volume.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      title_key: uniqueIndex("Movie_title_key").using("btree", table.title),
    };
  }
);

export const MovieRelations = relations(Movie, ({ one, many }) => ({
  Volume: one(Volume, {
    fields: [Movie.volumeId],
    references: [Volume.id],
  }),
  Website: one(Website, {
    fields: [Movie.websiteId],
    references: [Website.id],
  }),
  MovieMetadata: many(MovieMetadata),
  GenreDefinitions: many(GenreDefinition),
  _ActressToMovies: many(_ActressToMovie),
  _GenreToMovies: many(_GenreToMovie),
}));
