-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "actors" INTEGER NOT NULL DEFAULT 0,
    "cover" INTEGER NOT NULL DEFAULT 3,
    "path" TEXT NOT NULL,
    "volumeId" INTEGER NOT NULL,
    FOREIGN KEY ("volumeId") REFERENCES "Volume" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("id", "createdAt", "title", "actors", "cover", "path", "volumeId") SELECT "id", "createdAt", "title", "actors", "cover", "path", "volumeId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
