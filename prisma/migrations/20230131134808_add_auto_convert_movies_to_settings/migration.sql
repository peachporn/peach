-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "libraryPath" TEXT NOT NULL,
    "inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME',
    "autoConvertMovies" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Settings" ("id", "inferMovieTitle", "language", "libraryPath") SELECT "id", "inferMovieTitle", "language", "libraryPath" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
