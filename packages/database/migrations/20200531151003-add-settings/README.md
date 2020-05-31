# Migration `20200531151003-add-settings`

This migration has been generated at 5/31/2020, 3:10:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Settings" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"language" TEXT NOT NULL  )

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200530143210-make-volume-unique..20200531151003-add-settings
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
@@ -47,4 +47,9 @@
   volumeId    Int
   metadata    MovieMetadata?
 }
+
+model Settings {
+  id        Int @id @default(autoincrement())
+  language  String
+}
```


