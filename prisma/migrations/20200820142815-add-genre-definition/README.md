# Migration `20200820142815-add-genre-definition`

This migration has been generated at 8/20/2020, 2:28:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "GenreDefinition" (
"genreId" INTEGER NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"movieId" INTEGER NOT NULL,
"timeEnd" REAL NOT NULL,
"timeStart" REAL NOT NULL,FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200716181838-change-scene-times-to-float..20200820142815-add-genre-definition
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
@@ -70,9 +70,9 @@
   title       String @unique
   actresses   Actress[] @relation(references: [id])
   scenes      Scene[]
-  // genres      Genre[]
+  genres      GenreDefinition[]
   // highlights  Highlight[]
   actors      Int @default(0)
   // website     Website
   cover       Int @default(2)
@@ -100,8 +100,21 @@
   statusMessage String?
   parameters    String?
 }
+model GenreDefinition {
+  id Int @id @default(autoincrement())
+
+  genre Genre @relation(fields: [genreId], references: [id])
+  genreId Int
+
+  movie             Movie @relation(fields: [movieId], references: [id])
+  movieId           Int
+
+  timeStart Float
+  timeEnd Float
+}
+
 model Scene {
   id                Int @id @default(autoincrement())
   movie             Movie @relation(fields: [movieId], references: [id])
```


