# Migration `20200616175140-split-location`

This migration has been generated at 6/16/2020, 5:51:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Actress" (
"aliases" TEXT   ,"boobs" TEXT   ,"city" TEXT   ,"country" TEXT   ,"cupsize" TEXT   ,"dateOfBirth" DATE   ,"dateOfCareerstart" DATE   ,"dateOfDeath" DATE   ,"dateOfRetirement" DATE   ,"ethnicity" TEXT   ,"eyecolor" TEXT   ,"haircolor" TEXT   ,"height" INTEGER   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"latitude" REAL   ,"longitude" REAL   ,"measurements" TEXT   ,"name" TEXT NOT NULL  ,"officialWebsite" TEXT   ,"piercings" TEXT   ,"province" TEXT   ,"socialMediaLinks" TEXT   ,"tattoos" TEXT   ,"weight" INTEGER   )

INSERT INTO "quaint"."new_Actress" ("aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "measurements", "name", "officialWebsite", "piercings", "province", "socialMediaLinks", "tattoos", "weight") SELECT "aliases", "boobs", "city", "country", "cupsize", "dateOfBirth", "dateOfCareerstart", "dateOfDeath", "dateOfRetirement", "ethnicity", "eyecolor", "haircolor", "height", "id", "measurements", "name", "officialWebsite", "piercings", "province", "socialMediaLinks", "tattoos", "weight" FROM "quaint"."Actress"

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
migration 20200616172719-add-actress-movies..20200616175140-split-location
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
@@ -44,9 +44,10 @@
   ethnicity           String?
   country             String?
   province            String?
   city                String?
-  location            String?
+  latitude            Float?
+  longitude           Float?
   boobs               String?
   piercings           String?
```


