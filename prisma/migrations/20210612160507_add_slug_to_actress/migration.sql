-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "aliases" TEXT NOT NULL DEFAULT '[]',
    "slug" TEXT NOT NULL DEFAULT '',
    "haircolor" TEXT,
    "eyecolor" TEXT,
    "dateOfBirth" DATETIME,
    "dateOfCareerstart" DATETIME,
    "dateOfRetirement" DATETIME,
    "dateOfDeath" DATETIME,
    "ethnicity" TEXT,
    "country" TEXT,
    "province" TEXT,
    "city" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "boobs" TEXT,
    "piercings" TEXT,
    "tattoos" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "measurements" TEXT NOT NULL DEFAULT '{}',
    "cupsize" TEXT,
    "socialMediaLinks" TEXT,
    "officialWebsite" TEXT
);
INSERT INTO "new_Actress" ("id", "name", "aliases", "haircolor", "eyecolor", "dateOfBirth", "dateOfCareerstart", "dateOfRetirement", "dateOfDeath", "ethnicity", "country", "province", "city", "latitude", "longitude", "boobs", "piercings", "tattoos", "height", "weight", "measurements", "cupsize", "socialMediaLinks", "officialWebsite") SELECT "id", "name", "aliases", "haircolor", "eyecolor", "dateOfBirth", "dateOfCareerstart", "dateOfRetirement", "dateOfDeath", "ethnicity", "country", "province", "city", "latitude", "longitude", "boobs", "piercings", "tattoos", "height", "weight", "measurements", "cupsize", "socialMediaLinks", "officialWebsite" FROM "Actress";
DROP TABLE "Actress";
ALTER TABLE "new_Actress" RENAME TO "Actress";
CREATE UNIQUE INDEX "Actress.name_unique" ON "Actress"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
