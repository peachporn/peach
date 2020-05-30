# Migration `20200530142053-use-autoincrement-ids`

This migration has been generated at 5/30/2020, 2:20:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_MovieMetadata" (
"format" TEXT NOT NULL  ,"fps" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"minutes" INTEGER NOT NULL  ,"movieId" INTEGER NOT NULL  ,"quality" TEXT NOT NULL  ,"seconds" INTEGER NOT NULL  ,"size" INTEGER NOT NULL  ,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_MovieMetadata" ("format", "fps", "id", "minutes", "movieId", "quality", "seconds", "size") SELECT "format", "fps", "id", "minutes", "movieId", "quality", "seconds", "size" FROM "quaint"."MovieMetadata"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."MovieMetadata";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_MovieMetadata" RENAME TO "MovieMetadata";

CREATE UNIQUE INDEX "quaint"."MovieMetadata_movieId" ON "MovieMetadata"("movieId")

CREATE TABLE "quaint"."new_Movie" (
"actors" INTEGER NOT NULL DEFAULT 0 ,"cover" INTEGER NOT NULL DEFAULT 2 ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"path" TEXT NOT NULL  ,"title" TEXT NOT NULL  ,"volumeId" INTEGER NOT NULL  ,FOREIGN KEY ("volumeId") REFERENCES "Volume"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Movie" ("actors", "cover", "createdAt", "id", "path", "title", "volumeId") SELECT "actors", "cover", "createdAt", "id", "path", "title", "volumeId" FROM "quaint"."Movie"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Movie";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Movie" RENAME TO "Movie";

CREATE UNIQUE INDEX "quaint"."Movie.title" ON "Movie"("title")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200530141612-extract-metadata..20200530142053-use-autoincrement-ids
--- datamodel.dml
+++ datamodel.dml
@@ -1,25 +1,25 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./database.db"
 }
 generator client {
   provider = "prisma-client-js"
   output   = "./generated/"
 }
 model Volume {
-  id    Int   @id
+  id    Int   @id @default(autoincrement())
   name  String
   path  String
 }
 model MovieMetadata {
-  id          Int @id
+  id          Int @id @default(autoincrement())
   movie       Movie @relation(fields: [movieId], references: [id])
-  movieId     String
+  movieId     Int
   quality     String
   format      String
   fps         Int
@@ -30,21 +30,21 @@
   size        Int
 }
 model Movie {
-  id          String @id
+  id          Int @id @default(autoincrement())
   createdAt   DateTime @default(now())
+
   title       String @unique
+  // actresses   Actress[]
+  // genres      Genre[]
+  // highlights  Highlight[]
+  actors      Int @default(0)
+  // website     Website
+  cover       Int @default(2)
   path        String
   volume      Volume @relation(fields: [volumeId], references: [id])
   volumeId    Int
   metadata    MovieMetadata?
-
-  // actresses   Actress[]
-  // genres      Genre[]
-  // highlights  Highlight[]
-  actors      Int @default(0)
-  // website     Website
-  cover       Int @default(2)
 }
```


