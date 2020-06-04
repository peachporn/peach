# Migration `20200604134231-normalize-metadata`

This migration has been generated at 6/4/2020, 1:42:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_MovieMetadata" (
"durationSeconds" INTEGER NOT NULL  ,"format" TEXT NOT NULL  ,"fps" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"movieId" INTEGER NOT NULL  ,"quality" TEXT NOT NULL  ,"sizeInKB" INTEGER NOT NULL  ,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_MovieMetadata" ("format", "fps", "id", "movieId", "quality") SELECT "format", "fps", "id", "movieId", "quality" FROM "quaint"."MovieMetadata"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."MovieMetadata";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_MovieMetadata" RENAME TO "MovieMetadata";

CREATE UNIQUE INDEX "quaint"."MovieMetadata_movieId" ON "MovieMetadata"("movieId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200601163928-add-tasks..20200604134231-normalize-metadata
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
@@ -14,21 +14,19 @@
   path  String @unique
 }
 model MovieMetadata {
-  id          Int @id @default(autoincrement())
+  id                Int @id @default(autoincrement())
-  movie       Movie @relation(fields: [movieId], references: [id])
-  movieId     Int
+  movie             Movie @relation(fields: [movieId], references: [id])
+  movieId           Int
-  quality     String
-  format      String
-  fps         Int
+  quality           String
+  format            String
+  fps               Int
-  minutes     Int
-  seconds     Int
-
-  size        Int
+  durationSeconds   Int
+  sizeInKB          Int
 }
 model Movie {
   id          Int @id @default(autoincrement())
```


