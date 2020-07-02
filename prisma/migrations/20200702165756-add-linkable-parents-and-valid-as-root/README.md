# Migration `20200702165756-add-linkable-parents-and-valid-as-root`

This migration has been generated at 7/2/2020, 4:57:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Genre" (
"category" TEXT NOT NULL  ,"genreId" INTEGER   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"kinkiness" INTEGER NOT NULL  ,"name" TEXT NOT NULL  ,"validAsRoot" BOOLEAN NOT NULL  ,FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Genre" ("category", "id", "kinkiness", "name") SELECT "category", "id", "kinkiness", "name" FROM "quaint"."Genre"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Genre";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Genre" RENAME TO "Genre";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702144413-add-scenes-and-genres..20200702165756-add-linkable-parents-and-valid-as-root
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
@@ -116,7 +116,9 @@
   id                  Int @id @default(autoincrement())
   name                String
   category            String
   kinkiness           Int
+  validAsRoot         Boolean
+  linkableParents     Genre[] @relation("LinkableParents")
   scenes            Scene[] @relation(references: [id])
 }
```


