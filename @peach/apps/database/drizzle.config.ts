import assert from "assert";
import { defineConfig } from "drizzle-kit";

assert(process.env.DB_URL, "DB_URL is required");

export default defineConfig({
  schema: [
    "./drizzle/schema/actress.ts",
    "./drizzle/schema/genre.ts",
    "./drizzle/schema/metadata.ts",
    "./drizzle/schema/movie.ts",
    "./drizzle/schema/settings.ts",
    "./drizzle/schema/volume.ts",
    "./drizzle/schema/website.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
