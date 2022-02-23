/*
  Warnings:

  - You are about to drop the column `ethnicity` on the `Actress` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "actors" INTEGER NOT NULL DEFAULT 0,
    "cover" INTEGER NOT NULL DEFAULT 3,
    "websiteId" INTEGER,
    "path" TEXT NOT NULL,
    "volumeId" INTEGER NOT NULL,
    CONSTRAINT "Movie_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Movie_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "Volume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("actors", "cover", "createdAt", "id", "path", "title", "volumeId", "websiteId") SELECT "actors", "cover", "createdAt", "id", "path", "title", "volumeId", "websiteId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");
CREATE TABLE "new_Actress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "aliases" TEXT NOT NULL DEFAULT '[]',
    "haircolor" TEXT,
    "eyecolor" TEXT,
    "dateOfBirth" DATETIME,
    "dateOfCareerstart" DATETIME,
    "dateOfRetirement" DATETIME,
    "dateOfDeath" DATETIME,
    "country" TEXT,
    "province" TEXT,
    "city" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "boobs" TEXT,
    "cupsize" TEXT,
    "dick" BOOLEAN NOT NULL DEFAULT false,
    "pussy" BOOLEAN NOT NULL DEFAULT false,
    "genderExpression" TEXT NOT NULL DEFAULT 'androgynous',
    "piercings" TEXT,
    "tattoos" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "measurements" TEXT NOT NULL DEFAULT '{}',
    "socialMediaLinks" TEXT,
    "officialWebsite" TEXT
);
INSERT INTO "new_Actress" ("aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "slug", "socialMediaLinks", "tattoos", "weight") SELECT "aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "slug", "socialMediaLinks", "tattoos", "weight" FROM "Actress";
DROP TABLE "Actress";
ALTER TABLE "new_Actress" RENAME TO "Actress";
CREATE UNIQUE INDEX "Actress_name_key" ON "Actress"("name");
CREATE TABLE "new_GenreDefinition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "timeStart" REAL NOT NULL,
    CONSTRAINT "GenreDefinition_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GenreDefinition" ("genre", "id", "movieId", "timeStart") SELECT "genre", "id", "movieId", "timeStart" FROM "GenreDefinition";
DROP TABLE "GenreDefinition";
ALTER TABLE "new_GenreDefinition" RENAME TO "GenreDefinition";
CREATE TABLE "new_MovieMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "fps" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "sizeInKB" INTEGER NOT NULL,
    CONSTRAINT "MovieMetadata_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieMetadata" ("durationSeconds", "format", "fps", "id", "movieId", "quality", "sizeInKB") SELECT "durationSeconds", "format", "fps", "id", "movieId", "quality", "sizeInKB" FROM "MovieMetadata";
DROP TABLE "MovieMetadata";
ALTER TABLE "new_MovieMetadata" RENAME TO "MovieMetadata";
CREATE UNIQUE INDEX "MovieMetadata_movieId_key" ON "MovieMetadata"("movieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineIndex
DROP INDEX "Genre.name_unique";
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- RedefineIndex
DROP INDEX "Volume.path_unique";
CREATE UNIQUE INDEX "Volume_path_key" ON "Volume"("path");

-- RedefineIndex
DROP INDEX "Volume.name_unique";
CREATE UNIQUE INDEX "Volume_name_key" ON "Volume"("name");

-- RedefineIndex
DROP INDEX "Website.name_unique";
CREATE UNIQUE INDEX "Website_name_key" ON "Website"("name");
