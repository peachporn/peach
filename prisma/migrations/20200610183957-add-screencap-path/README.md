# Migration `20200610183957-add-screencap-path`

This migration has been generated at 6/10/2020, 6:39:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Settings" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME' ,"language" TEXT NOT NULL  ,"screencapPath" TEXT NOT NULL  )

INSERT INTO "quaint"."new_Settings" ("id", "inferMovieTitle", "language") SELECT "id", "inferMovieTitle", "language" FROM "quaint"."Settings"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Settings";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Settings" RENAME TO "Settings";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200604134231-normalize-metadata..20200610183957-add-screencap-path
--- datamodel.dml
+++ datamodel.dml
@@ -1,12 +1,12 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./database.db"
 }
 generator client {
   provider = "prisma-client-js"
-  output   = "./generated/"
+
 }
 model Volume {
   id    Int   @id @default(autoincrement())
@@ -49,8 +49,9 @@
 model Settings {
   id              Int @id @default(autoincrement())
   language        String
+  screencapPath   String
   inferMovieTitle String @default("FILENAME")
 }
 model Task {
```


