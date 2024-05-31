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
import { Movie } from "./movie";

export const Actress = pgTable(
  "Actress",
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
      name_key: uniqueIndex("Actress_name_key").using("btree", table.name),
    };
  }
);
export const ActressRelations = relations(Actress, ({ many }) => ({
  _ActressToMovies: many(_ActressToMovie),
}));

export const _ActressToMovie = pgTable(
  "_ActressToMovie",
  {
    A: bigint("A", { mode: "number" })
      .notNull()
      .references(() => Actress.id, { onDelete: "cascade", onUpdate: "cascade" }),
    B: bigint("B", { mode: "number" })
      .notNull()
      .references(() => Movie.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      AB_unique: uniqueIndex("_ActressToMovie_AB_unique").using("btree", table.A, table.B),
      B_idx: index().using("btree", table.B),
    };
  }
);
export const _ActressToMovieRelations = relations(_ActressToMovie, ({ one }) => ({
  Actress: one(Actress, {
    fields: [_ActressToMovie.A],
    references: [Actress.id],
  }),
  Movie: one(Movie, {
    fields: [_ActressToMovie.B],
    references: [Movie.id],
  }),
}));
