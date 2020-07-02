# Migration `20200702144413-add-scenes-and-genres`

This migration has been generated at 7/2/2020, 2:44:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Scene" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"movieId" INTEGER NOT NULL  ,"timeEnd" INTEGER NOT NULL  ,"timeStart" INTEGER NOT NULL  ,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."Genre" (
"category" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"kinkiness" INTEGER NOT NULL  ,"name" TEXT NOT NULL  )

CREATE TABLE "quaint"."_GenreToScene" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."_GenreToScene_AB_unique" ON "_GenreToScene"("A","B")

CREATE  INDEX "quaint"."_GenreToScene_B_index" ON "_GenreToScene"("B")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200623171717-setup-database..20200702144413-add-scenes-and-genres
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -69,8 +69,9 @@
   createdAt   DateTime @default(now())
   title       String @unique
   actresses   Actress[] @relation(references: [id])
+  scenes      Scene[]
   // genres      Genre[]
   // highlights  Highlight[]
   actors      Int @default(0)
   // website     Website
@@ -97,4 +98,25 @@
   status        String
   statusMessage String?
   parameters    String?
 }
+
+model Scene {
+  id                Int @id @default(autoincrement())
+
+  movie             Movie @relation(fields: [movieId], references: [id])
+  movieId           Int
+
+  timeStart         Int
+  timeEnd           Int
+
+  genres            Genre[] @relation(references: [id])
+}
+
+model Genre {
+  id                  Int @id @default(autoincrement())
+  name                String
+  category            String
+  kinkiness           Int
+
+  scenes            Scene[] @relation(references: [id])
+}
```


