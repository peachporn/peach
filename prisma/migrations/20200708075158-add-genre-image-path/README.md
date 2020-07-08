# Migration `20200708075158-add-genre-image-path`

This migration has been generated at 7/8/2020, 7:51:58 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Actress" (
"aliases" TEXT NOT NULL DEFAULT '[]',
"boobs" TEXT ,
"city" TEXT ,
"country" TEXT ,
"cupsize" TEXT ,
"dateOfBirth" DATE ,
"dateOfCareerstart" DATE ,
"dateOfDeath" DATE ,
"dateOfRetirement" DATE ,
"ethnicity" TEXT ,
"eyecolor" TEXT ,
"haircolor" TEXT ,
"height" INTEGER ,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"latitude" REAL ,
"longitude" REAL ,
"measurements" TEXT NOT NULL DEFAULT '{}',
"name" TEXT NOT NULL,
"officialWebsite" TEXT ,
"piercings" TEXT ,
"province" TEXT ,
"socialMediaLinks" TEXT ,
"tattoos" TEXT ,
"weight" INTEGER )

INSERT INTO "new_Actress" ("aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "socialMediaLinks", "tattoos", "weight") SELECT "aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "measurements", "name", "officialWebsite", "piercings", "province", "socialMediaLinks", "tattoos", "weight" FROM "Actress"

PRAGMA foreign_keys=off;
DROP TABLE "Actress";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Actress" RENAME TO "Actress";

CREATE UNIQUE INDEX "Actress.name" ON "Actress"("name")

ALTER TABLE "Settings" ADD COLUMN "genreImagePath" TEXT ;

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702172808-genre-unique..20200708075158-add-genre-image-path
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -54,9 +54,9 @@
   tattoos             String?
   height              Int?
   weight              Int?
-  measurements        String @default("[]")
+  measurements        String @default("{}")
   cupsize             String?
   socialMediaLinks    String?
   officialWebsite     String?
@@ -88,8 +88,9 @@
   id                 Int @id @default(autoincrement())
   language           String
   screencapPath      String?
   actressImagePath   String?
+  genreImagePath     String?
   inferMovieTitle    String @default("FILENAME")
 }
 model Task {
```


