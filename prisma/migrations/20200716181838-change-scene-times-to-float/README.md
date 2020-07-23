# Migration `20200716181838-change-scene-times-to-float`

This migration has been generated at 7/16/2020, 6:18:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Scene" (
"genres" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"movieId" INTEGER NOT NULL,
"timeEnd" REAL NOT NULL,
"timeStart" REAL NOT NULL,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "new_Scene" ("genres", "id", "movieId", "timeEnd", "timeStart") SELECT "genres", "id", "movieId", "timeEnd", "timeStart" FROM "Scene"

PRAGMA foreign_keys=off;
DROP TABLE "Scene";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Scene" RENAME TO "Scene";

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200708164224-reduce-scene-genre-links..20200716181838-change-scene-times-to-float
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
@@ -106,10 +106,10 @@
   movie             Movie @relation(fields: [movieId], references: [id])
   movieId           Int
-  timeStart         Int
-  timeEnd           Int
+  timeStart         Float
+  timeEnd           Float
   genres            String // { parent: Genre, children: Genre[] }[] serialized as JSON
 }
```


