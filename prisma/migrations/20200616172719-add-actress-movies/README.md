# Migration `20200616172719-add-actress-movies`

This migration has been generated at 6/16/2020, 5:27:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."_ActressToMovie" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Actress"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."_ActressToMovie_AB_unique" ON "_ActressToMovie"("A","B")

CREATE  INDEX "quaint"."_ActressToMovie_B_index" ON "_ActressToMovie"("B")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200616172316-add-actress..20200616172719-add-actress-movies
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
@@ -58,16 +58,18 @@
   cupsize             String?
   socialMediaLinks    String?
   officialWebsite     String?
+
+  movies              Movie[] @relation(references: [id])
 }
 model Movie {
   id          Int @id @default(autoincrement())
   createdAt   DateTime @default(now())
   title       String @unique
-  // actresses   Actress[]
+  actresses   Actress[] @relation(references: [id])
   // genres      Genre[]
   // highlights  Highlight[]
   actors      Int @default(0)
   // website     Website
```


