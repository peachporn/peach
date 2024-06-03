import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const movieMetadata = pgTable(
  "movieMetadata",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    movieId: bigint("movieId", { mode: "number" })
      .notNull()
      .references(() => movie.id, { onDelete: "restrict", onUpdate: "cascade" }),
    quality: text("quality").notNull(),
    format: text("format").notNull(),
    fps: bigint("fps", { mode: "number" }).notNull(),
    durationSeconds: bigint("durationSeconds", { mode: "number" }).notNull(),
    sizeInKB: bigint("sizeInKB", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      movieId_key: uniqueIndex("movieMetadata_movieId_key").using("btree", table.movieId),
    };
  }
);

export const movieMetadataRelations = relations(movieMetadata, ({ one }) => ({
  movie: one(movie, {
    fields: [movieMetadata.movieId],
    references: [movie.id],
  }),
}));
