import { relations } from "drizzle-orm";
import { bigint, boolean, pgTable, text } from "drizzle-orm/pg-core";
import { Genre } from "./genre";

export const Settings = pgTable("Settings", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  language: text("language").notNull(),
  libraryPath: text("libraryPath").notNull(),
  inferMovieTitle: text("inferMovieTitle").default("FILENAME").notNull(),
  autoConvertMovies: boolean("autoConvertMovies").default(true).notNull(),
});

export const SettingsRelations = relations(Settings, ({ many }) => ({
  Genres: many(Genre),
}));
