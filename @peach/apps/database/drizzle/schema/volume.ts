import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { Movie } from "./movie";

export const Volume = pgTable(
  "Volume",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    path: text("path").notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex("Volume_name_key").using("btree", table.name),
      path_key: uniqueIndex("Volume_path_key").using("btree", table.path),
    };
  }
);

export const VolumeRelations = relations(Volume, ({ many }) => ({
  Movies: many(Movie),
}));
