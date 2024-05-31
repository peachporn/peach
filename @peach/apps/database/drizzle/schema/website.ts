import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { Genre } from "./genre";
import { Movie } from "./movie";

export const Website = pgTable(
  "Website",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    genreId: bigint("genreId", { mode: "number" }).references(() => Genre.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      name_key: uniqueIndex("Website_name_key").using("btree", table.name),
    };
  }
);

export const WebsiteRelations = relations(Website, ({ one, many }) => ({
  Movies: many(Movie),
  Genre: one(Genre, {
    fields: [Website.genreId],
    references: [Genre.id],
  }),
}));
