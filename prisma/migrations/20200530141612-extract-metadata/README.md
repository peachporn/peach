# Migration `20200530141612-extract-metadata`

This migration has been generated at 5/30/2020, 2:16:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."MovieMetadata" (
"format" TEXT NOT NULL  ,"fps" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  ,"minutes" INTEGER NOT NULL  ,"movieId" TEXT NOT NULL  ,"quality" TEXT NOT NULL  ,"seconds" INTEGER NOT NULL  ,"size" INTEGER NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."new_Movie" (
"actors" INTEGER NOT NULL DEFAULT 0 ,"cover" INTEGER NOT NULL DEFAULT 2 ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" TEXT NOT NULL  ,"path" TEXT NOT NULL  ,"title" TEXT NOT NULL  ,"volumeId" INTEGER NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("volumeId") REFERENCES "Volume"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Movie" ("actors", "cover", "createdAt", "id", "path", "title", "volumeId") SELECT "actors", "cover", "createdAt", "id", "path", "title", "volumeId" FROM "quaint"."Movie"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Movie";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Movie" RENAME TO "Movie";

CREATE UNIQUE INDEX "quaint"."Movie.title" ON "Movie"("title")

CREATE UNIQUE INDEX "quaint"."MovieMetadata_movieId" ON "MovieMetadata"("movieId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200529214022-setup-movie..20200530141612-extract-metadata
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
@@ -13,8 +13,24 @@
   name  String
   path  String
 }
+model MovieMetadata {
+  id          Int @id
+
+  movie       Movie @relation(fields: [movieId], references: [id])
+  movieId     String
+
+  quality     String
+  format      String
+  fps         Int
+
+  minutes     Int
+  seconds     Int
+
+  size        Int
+}
+
 model Movie {
   id          String @id
   createdAt   DateTime @default(now())
   title       String @unique
@@ -22,17 +38,13 @@
   path        String
   volume      Volume @relation(fields: [volumeId], references: [id])
   volumeId    Int
+  metadata    MovieMetadata?
+
   // actresses   Actress[]
   // genres      Genre[]
   // highlights  Highlight[]
   actors      Int @default(0)
-  quality     String
-  format      String
-  fps         Int
-  minutes     Int
-  seconds     Int
-  size        Int
   // website     Website
   cover       Int @default(2)
 }
```


