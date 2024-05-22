/*
  Warnings:

  - Added the required column `validAsFetish` to the `Genre` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "kinkiness" INTEGER NOT NULL,
    "validAsRoot" BOOLEAN NOT NULL,
    "validAsFetish" BOOLEAN NOT NULL
);
INSERT INTO "new_Genre" ("id", "name", "category", "kinkiness", "validAsRoot") SELECT "id", "name", "category", "kinkiness", "validAsRoot" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
CREATE UNIQUE INDEX "Genre.name_unique" ON "Genre"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
