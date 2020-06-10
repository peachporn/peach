# Migration `20200529214022-setup-movie`

This migration has been generated at 5/29/2020, 9:40:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Volume" (
"id" INTEGER NOT NULL  ,"name" TEXT NOT NULL  ,"path" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE TABLE "quaint"."Movie" (
"actors" INTEGER NOT NULL DEFAULT 0 ,"cover" INTEGER NOT NULL DEFAULT 2 ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"format" TEXT NOT NULL  ,"fps" INTEGER NOT NULL  ,"id" TEXT NOT NULL  ,"minutes" INTEGER NOT NULL  ,"path" TEXT NOT NULL  ,"quality" TEXT NOT NULL  ,"seconds" INTEGER NOT NULL  ,"size" INTEGER NOT NULL  ,"title" TEXT NOT NULL  ,"volumeId" INTEGER NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("volumeId") REFERENCES "Volume"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."Movie.title" ON "Movie"("title")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200529214022-setup-movie
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,38 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:./database.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+  output   = "./generated/"
+}
+
+model Volume {
+  id    Int   @id
+  name  String
+  path  String
+}
+
+model Movie {
+  id          String @id
+  createdAt   DateTime @default(now())
+  title       String @unique
+
+  path        String
+  volume      Volume @relation(fields: [volumeId], references: [id])
+  volumeId    Int
+
+  // actresses   Actress[]
+  // genres      Genre[]
+  // highlights  Highlight[]
+  actors      Int @default(0)
+  quality     String
+  format      String
+  fps         Int
+  minutes     Int
+  seconds     Int
+  size        Int
+  // website     Website
+  cover       Int @default(2)
+}
```


