/*
  Warnings:

  - You are about to drop the column `screencapPath` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `actressImagePath` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `genreImagePath` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `libraryPath` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "libraryPath" TEXT NOT NULL,
    "inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME'
);
INSERT INTO "new_Settings" ("id", "language", "inferMovieTitle") SELECT "id", "language", "inferMovieTitle" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
