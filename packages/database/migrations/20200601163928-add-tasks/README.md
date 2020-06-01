# Migration `20200601163928-add-tasks`

This migration has been generated at 6/1/2020, 4:39:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Volume" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"path" TEXT NOT NULL  )

CREATE TABLE "quaint"."MovieMetadata" (
"format" TEXT NOT NULL  ,"fps" INTEGER NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"minutes" INTEGER NOT NULL  ,"movieId" INTEGER NOT NULL  ,"quality" TEXT NOT NULL  ,"seconds" INTEGER NOT NULL  ,"size" INTEGER NOT NULL  ,FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."Movie" (
"actors" INTEGER NOT NULL DEFAULT 0 ,"cover" INTEGER NOT NULL DEFAULT 2 ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"path" TEXT NOT NULL  ,"title" TEXT NOT NULL  ,"volumeId" INTEGER NOT NULL  ,FOREIGN KEY ("volumeId") REFERENCES "Volume"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."Settings" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME' ,"language" TEXT NOT NULL  )

CREATE TABLE "quaint"."Task" (
"category" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"parameters" TEXT   ,"status" TEXT NOT NULL  )

CREATE UNIQUE INDEX "quaint"."Volume.name" ON "Volume"("name")

CREATE UNIQUE INDEX "quaint"."Volume.path" ON "Volume"("path")

CREATE UNIQUE INDEX "quaint"."MovieMetadata_movieId" ON "MovieMetadata"("movieId")

CREATE UNIQUE INDEX "quaint"."Movie.title" ON "Movie"("title")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200531151003-add-settings..20200601163928-add-tasks
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
@@ -49,7 +49,15 @@
   metadata    MovieMetadata?
 }
 model Settings {
-  id        Int @id @default(autoincrement())
-  language  String
+  id              Int @id @default(autoincrement())
+  language        String
+  inferMovieTitle String @default("FILENAME")
 }
+
+model Task {
+  id          Int @id @default(autoincrement())
+  category    String
+  status      String
+  parameters  String?
+}
```


