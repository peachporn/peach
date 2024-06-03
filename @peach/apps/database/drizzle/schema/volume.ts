import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const volume = pgTable(
  "volume",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    path: text("path").notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex("volume_name_key").using("btree", table.name),
      path_key: uniqueIndex("volume_path_key").using("btree", table.path),
    };
  }
);

export const volumeRelations = relations(volume, ({ many }) => ({
  movies: many(movie),
}));
