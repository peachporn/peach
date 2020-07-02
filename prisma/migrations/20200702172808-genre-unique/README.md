# Migration `20200702172808-genre-unique`

This migration has been generated at 7/2/2020, 5:28:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE UNIQUE INDEX "quaint"."Genre.name" ON "Genre"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702165756-add-linkable-parents-and-valid-as-root..20200702172808-genre-unique
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
@@ -113,9 +113,9 @@
 }
 model Genre {
   id                  Int @id @default(autoincrement())
-  name                String
+  name                String @unique
   category            String
   kinkiness           Int
   validAsRoot         Boolean
   linkableParents     Genre[] @relation("LinkableParents")
```


