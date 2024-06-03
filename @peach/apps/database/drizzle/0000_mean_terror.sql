ALTER TABLE "movie" DROP CONSTRAINT IF EXISTS "Movie_volumeId_fkey";
--> statement-breakpoint
ALTER TABLE "movie" DROP CONSTRAINT IF EXISTS "Movie_websiteId_fkey";
--> statement-breakpoint
ALTER TABLE "movieMetadata" DROP CONSTRAINT IF EXISTS "MovieMetadata_movieId_fkey";
--> statement-breakpoint
ALTER TABLE "genreDefinition" DROP CONSTRAINT IF EXISTS "GenreDefinition_movieId_fkey";
--> statement-breakpoint
ALTER TABLE "movieActresses" DROP CONSTRAINT IF EXISTS "_ActressToMovie_A_fkey";
--> statement-breakpoint
ALTER TABLE "movieActresses" DROP CONSTRAINT IF EXISTS "_ActressToMovie_B_fkey";
--> statement-breakpoint
ALTER TABLE "genre" DROP CONSTRAINT IF EXISTS "Genre_settingsId_fkey";
--> statement-breakpoint
ALTER TABLE "website" DROP CONSTRAINT IF EXISTS "Website_genreId_fkey";
--> statement-breakpoint
ALTER TABLE "movieGenres" DROP CONSTRAINT IF EXISTS "_GenreToMovie_A_fkey";
--> statement-breakpoint
ALTER TABLE "movieGenres" DROP CONSTRAINT IF EXISTS "_GenreToMovie_B_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "Movie_title_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Volume_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Volume_path_key";--> statement-breakpoint
DROP INDEX IF EXISTS "MovieMetadata_movieId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Actress_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "_ActressToMovie_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_ActressToMovie_B_index";--> statement-breakpoint
DROP INDEX IF EXISTS "Genre_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Website_name_key";--> statement-breakpoint
DROP INDEX IF EXISTS "_GenreToMovie_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_GenreToMovie_B_index";--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_websiteId_website_id_fk" FOREIGN KEY ("websiteId") REFERENCES "public"."website"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movie" ADD CONSTRAINT "movie_volumeId_volume_id_fk" FOREIGN KEY ("volumeId") REFERENCES "public"."volume"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movieMetadata" ADD CONSTRAINT "movieMetadata_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "genreDefinition" ADD CONSTRAINT "genreDefinition_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movieActresses" ADD CONSTRAINT "movieActresses_actressId_actress_id_fk" FOREIGN KEY ("actressId") REFERENCES "public"."actress"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movieActresses" ADD CONSTRAINT "movieActresses_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "website" ADD CONSTRAINT "website_genreId_genre_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genre"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movieGenres" ADD CONSTRAINT "movieGenres_genreId_genre_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."genre"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "movieGenres" ADD CONSTRAINT "movieGenres_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "movie_title_key" ON "movie" USING btree (title);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "volume_name_key" ON "volume" USING btree (name);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "volume_path_key" ON "volume" USING btree (path);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "actress_name_key" ON "actress" USING btree (name);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "genre_name_key" ON "genre" USING btree (name);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "website_name_key" ON "website" USING btree (name);--> statement-breakpoint
ALTER TABLE "movie" DROP COLUMN IF EXISTS "actors";--> statement-breakpoint
ALTER TABLE "genre" DROP COLUMN IF EXISTS "validAsRoot";--> statement-breakpoint
ALTER TABLE "genre" DROP COLUMN IF EXISTS "validAsFetish";--> statement-breakpoint
ALTER TABLE "genre" DROP COLUMN IF EXISTS "settingsId";