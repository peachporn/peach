import { defineConfig } from "drizzle-kit";
import { url } from "./src/url";

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
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
