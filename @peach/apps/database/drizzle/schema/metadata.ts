import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { Movie } from "./movie";

export const MovieMetadata = pgTable(
  "MovieMetadata",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    movieId: bigint("movieId", { mode: "number" })
      .notNull()
      .references(() => Movie.id, { onDelete: "restrict", onUpdate: "cascade" }),
    quality: text("quality").notNull(),
    format: text("format").notNull(),
    fps: bigint("fps", { mode: "number" }).notNull(),
    durationSeconds: bigint("durationSeconds", { mode: "number" }).notNull(),
    sizeInKB: bigint("sizeInKB", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      movieId_key: uniqueIndex("MovieMetadata_movieId_key").using("btree", table.movieId),
    };
  }
);

export const MovieMetadataRelations = relations(MovieMetadata, ({ one }) => ({
  Movie: one(Movie, {
    fields: [MovieMetadata.movieId],
    references: [Movie.id],
  }),
}));
