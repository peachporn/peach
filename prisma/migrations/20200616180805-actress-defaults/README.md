# Migration `20200616180805-actress-defaults`

This migration has been generated at 6/16/2020, 6:08:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Actress" (
"aliases" TEXT NOT NULL DEFAULT '[]' ,"boobs" TEXT   ,"city" TEXT   ,"country" TEXT   ,"cupsize" TEXT   ,"dateOfBirth" DATE   ,"dateOfCareerstart" DATE   ,"dateOfDeath" DATE   ,"dateOfRetirement" DATE   ,"ethnicity" TEXT   ,"eyecolor" TEXT   ,"haircolor" TEXT   ,"height" INTEGER   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"latitude" REAL   ,"longitude" REAL   ,"measurements" TEXT NOT NULL DEFAULT '[]' ,"name" TEXT NOT NULL  ,"officialWebsite" TEXT   ,"piercings" TEXT NOT NULL DEFAULT '[]' ,"province" TEXT   ,"socialMediaLinks" TEXT   ,"tattoos" TEXT NOT NULL DEFAULT '[]' ,"weight" INTEGER   )

INSERT INTO "quaint"."new_Actress" ("boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "name", "officialWebsite", "province", "socialMediaLinks", "weight", "aliases", "measurements", "piercings", "tattoos") SELECT "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "latitude", "longitude", "name", "officialWebsite", "province", "socialMediaLinks", "weight", coalesce("aliases", '[]') AS "aliases", coalesce("measurements", '[]') AS "measurements", coalesce("piercings", '[]') AS "piercings", coalesce("tattoos", '[]') AS "tattoos" FROM "quaint"."Actress"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Actress";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Actress" RENAME TO "Actress";

CREATE UNIQUE INDEX "quaint"."Actress.name" ON "Actress"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200616175140-split-location..20200616180805-actress-defaults
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./database.db"
 }
 generator client {
   provider = "prisma-client-js"
@@ -30,9 +30,9 @@
 model Actress {
   id                  Int @id @default(autoincrement())
   name                String @unique
-  aliases             String?
+  aliases             String @default("[]")
   haircolor           String?
   eyecolor            String?
@@ -49,14 +49,14 @@
   longitude           Float?
   boobs               String?
-  piercings           String?
-  tattoos             String?
+  piercings           String @default("[]")
+  tattoos             String @default("[]")
   height              Int?
   weight              Int?
-  measurements        String?
+  measurements        String @default("[]")
   cupsize             String?
   socialMediaLinks    String?
   officialWebsite     String?
```


