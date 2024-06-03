import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  doublePrecision,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { movie } from "./movie";

export const actress = pgTable(
  "actress",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    slug: text("slug").default("").notNull(),
    name: text("name").notNull(),
    aliases: text("aliases").default("[]").notNull(),
    haircolor: text("haircolor"),
    eyecolor: text("eyecolor"),
    dateOfBirth: timestamp("dateOfBirth", { mode: "string" }),
    dateOfCareerstart: timestamp("dateOfCareerstart", { mode: "string" }),
    dateOfRetirement: timestamp("dateOfRetirement", { mode: "string" }),
    dateOfDeath: timestamp("dateOfDeath", { mode: "string" }),
    country: text("country"),
    province: text("province"),
    city: text("city"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    boobs: text("boobs"),
    cupsize: text("cupsize"),
    dick: boolean("dick").default(false).notNull(),
    pussy: boolean("pussy").default(false).notNull(),
    genderExpression: text("genderExpression").default("Androgynous").notNull(),
    piercings: text("piercings"),
    tattoos: text("tattoos"),
    height: bigint("height", { mode: "number" }),
    weight: bigint("weight", { mode: "number" }),
    measurements: text("measurements").default("{}").notNull(),
    socialMediaLinks: text("socialMediaLinks"),
    officialWebsite: text("officialWebsite"),
  },
  (table) => {
    return {
      name_key: uniqueIndex("actress_name_key").using("btree", table.name),
    };
  }
);
export const actressRelations = relations(actress, ({ many }) => ({
  movieActresses: many(movieActresses),
}));

export const movieActresses = pgTable(
  "movieActresses",
  {
    actressId: bigint("actressId", { mode: "number" })
      .notNull()
      .references(() => actress.id, { onDelete: "cascade", onUpdate: "cascade" }),
    movieId: bigint("movieId", { mode: "number" })
      .notNull()
      .references(() => movie.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      actressIdMovieId_unique: uniqueIndex("movieActresses_actressIdMovieId_unique").using(
        "btree",
        table.actressId,
        table.movieId
      ),
      movieId_idx: index().using("btree", table.movieId),
    };
  }
);
export const movieActressesRelations = relations(movieActresses, ({ one }) => ({
  actress: one(actress, {
    fields: [movieActresses.actressId],
    references: [actress.id],
  }),
  movie: one(movie, {
    fields: [movieActresses.movieId],
    references: [movie.id],
  }),
}));
