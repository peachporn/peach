# Migration `20200820142915-remove-scenes`

This migration has been generated at 8/20/2020, 2:29:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

PRAGMA foreign_keys=off;
DROP TABLE "Scene";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820142815-add-genre-definition..20200820142915-remove-scenes
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
@@ -69,9 +69,8 @@
   createdAt   DateTime @default(now())
   title       String @unique
   actresses   Actress[] @relation(references: [id])
-  scenes      Scene[]
   genres      GenreDefinition[]
   // highlights  Highlight[]
   actors      Int @default(0)
   // website     Website
@@ -113,20 +112,8 @@
   timeStart Float
   timeEnd Float
 }
-model Scene {
-  id                Int @id @default(autoincrement())
-
-  movie             Movie @relation(fields: [movieId], references: [id])
-  movieId           Int
-
-  timeStart         Float
-  timeEnd           Float
-
-  genres            String // { parent: Genre, children: Genre[] }[] serialized as JSON
-}
-
 model Genre {
   id                  Int @id @default(autoincrement())
   name                String @unique
   category            String
```


