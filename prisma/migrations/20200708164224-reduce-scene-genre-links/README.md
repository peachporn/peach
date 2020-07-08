# Migration `20200708164224-reduce-scene-genre-links`

This migration has been generated at 7/8/2020, 4:42:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Scene" (
"genres" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"movieId" INTEGER NOT NULL,
"timeEnd" INTEGER NOT NULL,
"timeStart" INTEGER NOT NULL,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "new_Scene" ("id", "movieId", "timeEnd", "timeStart") SELECT "id", "movieId", "timeEnd", "timeStart" FROM "Scene"

PRAGMA foreign_keys=off;
DROP TABLE "Scene";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Scene" RENAME TO "Scene";

PRAGMA foreign_keys=off;
DROP TABLE "_GenreToScene";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200708092432-add-linkable-children..20200708164224-reduce-scene-genre-links
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
@@ -109,9 +109,9 @@
   timeStart         Int
   timeEnd           Int
-  genres            Genre[] @relation(references: [id])
+  genres            String // { parent: Genre, children: Genre[] }[] serialized as JSON
 }
 model Genre {
   id                  Int @id @default(autoincrement())
@@ -121,7 +121,5 @@
   validAsRoot         Boolean
   linkableParents     Genre[] @relation("Subgenre", references: [id])
   linkableChildren    Genre[] @relation("Subgenre", references: [id])
-
-  scenes              Scene[] @relation(references: [id])
 }
```


