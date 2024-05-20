-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "genderExpression" TEXT NOT NULL DEFAULT 'Androgynous',
    "piercings" TEXT,
    "tattoos" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "measurements" TEXT NOT NULL DEFAULT '{}',
    "socialMediaLinks" TEXT,
    "officialWebsite" TEXT
);
INSERT INTO "new_Actress" ("aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "dick", "eyecolor", "genderExpression", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "pussy", "slug", "socialMediaLinks", "tattoos", "weight") SELECT "aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "dick", "eyecolor", "genderExpression", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "pussy", "slug", "socialMediaLinks", "tattoos", "weight" FROM "Actress";
DROP TABLE "Actress";
ALTER TABLE "new_Actress" RENAME TO "Actress";
CREATE UNIQUE INDEX "Actress_name_key" ON "Actress"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
