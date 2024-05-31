-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Movie" (
	"id" bigint PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" text NOT NULL,
	"actors" bigint DEFAULT 0 NOT NULL,
	"cover" bigint DEFAULT 3 NOT NULL,
	"websiteId" bigint,
	"path" text NOT NULL,
	"volumeId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Volume" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MovieMetadata" (
	"id" bigint PRIMARY KEY NOT NULL,
	"movieId" bigint NOT NULL,
	"quality" text NOT NULL,
	"format" text NOT NULL,
	"fps" bigint NOT NULL,
	"durationSeconds" bigint NOT NULL,
	"sizeInKB" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Actress" (
	"id" bigint PRIMARY KEY NOT NULL,
	"slug" text DEFAULT '' NOT NULL,
	"name" text NOT NULL,
	"aliases" text DEFAULT '[]' NOT NULL,
	"haircolor" text,
	"eyecolor" text,
	"dateOfBirth" timestamp,
	"dateOfCareerstart" timestamp,
	"dateOfRetirement" timestamp,
	"dateOfDeath" timestamp,
	"country" text,
	"province" text,
	"city" text,
	"latitude" double precision,
	"longitude" double precision,
	"boobs" text,
	"cupsize" text,
	"dick" boolean DEFAULT false NOT NULL,
	"pussy" boolean DEFAULT false NOT NULL,
	"genderExpression" text DEFAULT 'Androgynous' NOT NULL,
	"piercings" text,
	"tattoos" text,
	"height" bigint,
	"weight" bigint,
	"measurements" text DEFAULT '{}' NOT NULL,
	"socialMediaLinks" text,
	"officialWebsite" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GenreDefinition" (
	"id" bigint PRIMARY KEY NOT NULL,
	"movieId" bigint NOT NULL,
	"genre" text NOT NULL,
	"timeStart" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Task" (
	"id" bigint PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"status" text NOT NULL,
	"statusMessage" text,
	"parameters" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Settings" (
	"id" bigint PRIMARY KEY NOT NULL,
	"language" text NOT NULL,
	"libraryPath" text NOT NULL,
	"inferMovieTitle" text DEFAULT 'FILENAME' NOT NULL,
	"autoConvertMovies" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" text PRIMARY KEY NOT NULL,
	"checksum" text NOT NULL,
	"finished_at" timestamp,
	"migration_name" text NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp,
	"started_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"applied_steps_count" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_ActressToMovie" (
	"A" bigint NOT NULL,
	"B" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_Subgenre" (
	"A" bigint NOT NULL,
	"B" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Genre" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"kinkiness" bigint NOT NULL,
	"validAsRoot" boolean NOT NULL,
	"validAsFetish" boolean NOT NULL,
	"settingsId" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Website" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"genreId" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_GenreToMovie" (
	"A" bigint NOT NULL,
	"B" bigint NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Movie" ADD CONSTRAINT "Movie_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "public"."Volume"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Movie" ADD CONSTRAINT "Movie_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "public"."Website"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MovieMetadata" ADD CONSTRAINT "MovieMetadata_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GenreDefinition" ADD CONSTRAINT "GenreDefinition_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ActressToMovie" ADD CONSTRAINT "_ActressToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Actress"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ActressToMovie" ADD CONSTRAINT "_ActressToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Movie"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_Subgenre" ADD CONSTRAINT "_Subgenre_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genre"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_Subgenre" ADD CONSTRAINT "_Subgenre_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Genre"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Genre" ADD CONSTRAINT "Genre_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "public"."Settings"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Website" ADD CONSTRAINT "Website_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "public"."Genre"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Genre"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Movie"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Movie_title_key" ON "Movie" USING btree (title text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Volume_name_key" ON "Volume" USING btree (name text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Volume_path_key" ON "Volume" USING btree (path text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "MovieMetadata_movieId_key" ON "MovieMetadata" USING btree (movieId int8_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Actress_name_key" ON "Actress" USING btree (name text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_ActressToMovie_AB_unique" ON "_ActressToMovie" USING btree (A int8_ops,B int8_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_ActressToMovie_B_index" ON "_ActressToMovie" USING btree (B int8_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_Subgenre_AB_unique" ON "_Subgenre" USING btree (A int8_ops,B int8_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_Subgenre_B_index" ON "_Subgenre" USING btree (B int8_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Genre_name_key" ON "Genre" USING btree (name text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Website_name_key" ON "Website" USING btree (name text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_GenreToMovie_AB_unique" ON "_GenreToMovie" USING btree (A int8_ops,B int8_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_GenreToMovie_B_index" ON "_GenreToMovie" USING btree (B int8_ops);
*/