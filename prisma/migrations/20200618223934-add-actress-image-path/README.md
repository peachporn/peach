# Migration `20200618223934-add-actress-image-path`

This migration has been generated at 6/18/2020, 10:39:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Settings" (
"actressImagePath" TEXT   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME' ,"language" TEXT NOT NULL  ,"screencapPath" TEXT   )

INSERT INTO "quaint"."new_Settings" ("actressImagePath", "id", "inferMovieTitle", "language", "screencapPath") SELECT "actressImagePath", "id", "inferMovieTitle", "language", "screencapPath" FROM "quaint"."Settings"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Settings";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Settings" RENAME TO "Settings";

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."new_Settings";;
PRAGMA foreign_keys=on

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200616180805-actress-defaults..20200618223934-add-actress-image-path
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:../dev.db"
 }
 generator client {
   provider = "prisma-client-js"
@@ -49,10 +49,10 @@
   longitude           Float?
   boobs               String?
-  piercings           String @default("[]")
-  tattoos             String @default("[]")
+  piercings           String?
+  tattoos             String?
   height              Int?
   weight              Int?
   measurements        String @default("[]")
@@ -83,12 +83,13 @@
   metadata    MovieMetadata?
 }
 model Settings {
-  id              Int @id @default(autoincrement())
-  language        String
-  screencapPath   String
-  inferMovieTitle String @default("FILENAME")
+  id                 Int @id @default(autoincrement())
+  language           String
+  screencapPath      String?
+  actressImagePath   String?
+  inferMovieTitle    String @default("FILENAME")
 }
 model Task {
   id          Int @id @default(autoincrement())
```


