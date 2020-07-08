# Migration `20200708092432-add-linkable-children`

This migration has been generated at 7/8/2020, 9:24:32 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "_Subgenre" (
"A" INTEGER NOT NULL,
"B" INTEGER NOT NULL,FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "new_Genre" (
"category" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"kinkiness" INTEGER NOT NULL,
"name" TEXT NOT NULL,
"validAsRoot" BOOLEAN NOT NULL)

INSERT INTO "new_Genre" ("category", "id", "kinkiness", "name", "validAsRoot") SELECT "category", "id", "kinkiness", "name", "validAsRoot" FROM "Genre"

PRAGMA foreign_keys=off;
DROP TABLE "Genre";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Genre" RENAME TO "Genre";

CREATE UNIQUE INDEX "Genre.name" ON "Genre"("name")

CREATE UNIQUE INDEX "_Subgenre_AB_unique" ON "_Subgenre"("A","B")

CREATE  INDEX "_Subgenre_B_index" ON "_Subgenre"("B")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200708075158-add-genre-image-path..20200708092432-add-linkable-children
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
@@ -118,8 +118,10 @@
   name                String @unique
   category            String
   kinkiness           Int
   validAsRoot         Boolean
-  linkableParents     Genre[] @relation("LinkableParents")
-  scenes            Scene[] @relation(references: [id])
+  linkableParents     Genre[] @relation("Subgenre", references: [id])
+  linkableChildren    Genre[] @relation("Subgenre", references: [id])
+
+  scenes              Scene[] @relation(references: [id])
 }
```


