-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "kinkiness" INTEGER NOT NULL,
    "validAsRoot" BOOLEAN NOT NULL,
    "validAsFetish" BOOLEAN NOT NULL,
    "settingsId" INTEGER,
    FOREIGN KEY ("settingsId") REFERENCES "Settings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Genre" ("id", "name", "category", "kinkiness", "validAsRoot", "validAsFetish", "settingsId") SELECT "id", "name", "category", "kinkiness", "validAsRoot", "validAsFetish", "settingsId" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
CREATE UNIQUE INDEX "Genre.name_unique" ON "Genre"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
