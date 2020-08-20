# Migration `20200820143236-add-tree-genres`

This migration has been generated at 8/20/2020, 2:32:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Scene" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"movieId" INTEGER NOT NULL,
"timeEnd" REAL NOT NULL,
"timeStart" REAL NOT NULL,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "new_GenreDefinition" (
"genre" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"movieId" INTEGER NOT NULL,
"timeEnd" REAL NOT NULL,
"timeStart" REAL NOT NULL,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "new_GenreDefinition" ("id", "movieId", "timeEnd", "timeStart") SELECT "id", "movieId", "timeEnd", "timeStart" FROM "GenreDefinition"

PRAGMA foreign_keys=off;
DROP TABLE "GenreDefinition";;
PRAGMA foreign_keys=on

ALTER TABLE "new_GenreDefinition" RENAME TO "GenreDefinition";

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820142915-remove-scenes..20200820143236-add-tree-genres
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
@@ -69,8 +69,9 @@
   createdAt   DateTime @default(now())
   title       String @unique
   actresses   Actress[] @relation(references: [id])
+  scenes      Scene[]
   genres      GenreDefinition[]
   // highlights  Highlight[]
   actors      Int @default(0)
   // website     Website
@@ -100,18 +101,28 @@
   parameters    String?
 }
 model GenreDefinition {
-  id Int @id @default(autoincrement())
+  id          Int @id @default(autoincrement())
-  genre Genre @relation(fields: [genreId], references: [id])
-  genreId Int
+  movie       Movie @relation(fields: [movieId], references: [id])
+  movieId     Int
+  genre       String // { parent: Genre, children: Genre[] } serialized as JSON
+
+  timeStart   Float
+  timeEnd     Float
+}
+
+model Scene {
+  id                Int @id @default(autoincrement())
+
   movie             Movie @relation(fields: [movieId], references: [id])
   movieId           Int
-  timeStart Float
-  timeEnd Float
+  timeStart         Float
+  timeEnd           Float
+
 }
 model Genre {
   id                  Int @id @default(autoincrement())
```


