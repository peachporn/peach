# Migration `20200616172316-add-actress`

This migration has been generated at 6/16/2020, 5:23:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Actress" (
"aliases" TEXT   ,"boobs" TEXT   ,"city" TEXT   ,"country" TEXT   ,"cupsize" TEXT   ,"dateOfBirth" DATE   ,"dateOfCareerstart" DATE   ,"dateOfDeath" DATE   ,"dateOfRetirement" DATE   ,"ethnicity" TEXT   ,"eyecolor" TEXT   ,"haircolor" TEXT   ,"height" INTEGER   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"location" TEXT   ,"measurements" TEXT   ,"name" TEXT NOT NULL  ,"officialWebsite" TEXT   ,"piercings" TEXT   ,"province" TEXT   ,"socialMediaLinks" TEXT   ,"tattoos" TEXT   ,"weight" INTEGER   )

CREATE UNIQUE INDEX "quaint"."Actress.name" ON "Actress"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200610183957-add-screencap-path..20200616172316-add-actress
--- datamodel.dml
+++ datamodel.dml
@@ -1,12 +1,12 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./database.db"
 }
 generator client {
   provider = "prisma-client-js"
-
+  binaryTargets = ["native","debian-openssl-1.1.x"]
 }
 model Volume {
   id    Int   @id @default(autoincrement())
@@ -27,8 +27,41 @@
   durationSeconds   Int
   sizeInKB          Int
 }
+model Actress {
+  id                  Int @id @default(autoincrement())
+  name                String @unique
+  aliases             String?
+
+  haircolor           String?
+  eyecolor            String?
+
+  dateOfBirth         DateTime?
+  dateOfCareerstart   DateTime?
+  dateOfRetirement    DateTime?
+  dateOfDeath         DateTime?
+
+  ethnicity           String?
+  country             String?
+  province            String?
+  city                String?
+  location            String?
+
+  boobs               String?
+
+  piercings           String?
+  tattoos             String?
+
+  height              Int?
+  weight              Int?
+  measurements        String?
+  cupsize             String?
+
+  socialMediaLinks    String?
+  officialWebsite     String?
+}
+
 model Movie {
   id          Int @id @default(autoincrement())
   createdAt   DateTime @default(now())
```


