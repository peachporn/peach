import { relations } from "drizzle-orm";
import { bigint, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { genre } from "./genre";
import { movie } from "./movie";

export const website = pgTable(
  "website",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    genreId: bigint("genreId", { mode: "number" }).references(() => genre.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => {
    return {
      name_key: uniqueIndex("website_name_key").using("btree", table.name),
    };
  }
);

export const websiteRelations = relations(website, ({ one, many }) => ({
  movies: many(movie),
  genre: one(genre, {
    fields: [website.genreId],
    references: [genre.id],
  }),
}));
