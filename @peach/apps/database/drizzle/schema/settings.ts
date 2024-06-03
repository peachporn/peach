import { bigint, boolean, pgTable, text } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  language: text("language").notNull(),
  libraryPath: text("libraryPath").notNull(),
  inferMovieTitle: text("inferMovieTitle").default("FILENAME").notNull(),
  autoConvertMovies: boolean("autoConvertMovies").default(true).notNull(),
});
