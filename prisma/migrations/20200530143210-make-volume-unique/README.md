# Migration `20200530143210-make-volume-unique`

This migration has been generated at 5/30/2020, 2:32:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE UNIQUE INDEX "quaint"."Volume.name" ON "Volume"("name")

CREATE UNIQUE INDEX "quaint"."Volume.path" ON "Volume"("path")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200530142053-use-autoincrement-ids..20200530143210-make-volume-unique
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
@@ -9,10 +9,10 @@
 }
 model Volume {
   id    Int   @id @default(autoincrement())
-  name  String
-  path  String
+  name  String @unique
+  path  String @unique
 }
 model MovieMetadata {
   id          Int @id @default(autoincrement())
```


