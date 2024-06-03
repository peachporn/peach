import { relations } from "drizzle-orm";
import { bigint, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { movieActresses } from "./actress";
import { genreDefinition, movieGenres } from "./genre";
import { movieMetadata } from "./metadata";
import { volume } from "./volume";
import { website } from "./website";

export const movie = pgTable(
  "movie",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
    title: text("title").notNull(),
    cover: bigint("cover", { mode: "number" }).default(3).notNull(),
    path: text("path").notNull(),
    websiteId: bigint("websiteId", { mode: "number" }).references(() => website.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    volumeId: bigint("volumeId", { mode: "number" })
      .notNull()
      .references(() => volume.id, { onDelete: "restrict", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      title_key: uniqueIndex("movie_title_key").using("btree", table.title),
    };
  }
);

export const movieRelations = relations(movie, ({ one, many }) => ({
  volume: one(volume, {
    fields: [movie.volumeId],
    references: [volume.id],
  }),
  website: one(website, {
    fields: [movie.websiteId],
    references: [website.id],
  }),
  movieMetadata: many(movieMetadata),
  genreDefinitions: many(genreDefinition),
  movieActresses: many(movieActresses),
  movieGenres: many(movieGenres),
}));
