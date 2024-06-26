import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as actressSchema from "../drizzle/schema/actress.ts";
import * as genreSchema from "../drizzle/schema/genre.ts";
import * as metadataSchema from "../drizzle/schema/metadata.ts";
import * as movieSchema from "../drizzle/schema/movie.ts";
import * as settingsSchema from "../drizzle/schema/settings.ts";
import * as volumeSchema from "../drizzle/schema/volume.ts";
import * as websiteSchema from "../drizzle/schema/website.ts";
import { url } from "./url.ts";

const client = new Client({
  connectionString: url,
});

if (process.env.BUILDTIME !== "true") {
  await client.connect();
}

export const db = drizzle(client, {
  schema: {
    ...actressSchema,
    ...genreSchema,
    ...metadataSchema,
    ...movieSchema,
    ...settingsSchema,
    ...volumeSchema,
    ...websiteSchema,
  },
});
