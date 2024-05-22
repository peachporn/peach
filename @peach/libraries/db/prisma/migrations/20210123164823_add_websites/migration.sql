/*
  Warnings:

  - Added the required column `websiteId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "genreId" INTEGER,
    FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "actors" INTEGER NOT NULL DEFAULT 0,
    "cover" INTEGER NOT NULL DEFAULT 3,
    "websiteId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "volumeId" INTEGER NOT NULL,
    FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("volumeId") REFERENCES "Volume" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("id", "createdAt", "title", "actors", "cover", "path", "volumeId") SELECT "id", "createdAt", "title", "actors", "cover", "path", "volumeId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Website.name_unique" ON "Website"("name");
