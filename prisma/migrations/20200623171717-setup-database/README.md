# Migration `20200623171717-setup-database`

This migration has been generated at 6/23/2020, 5:17:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200623171717-setup-database
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,100 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:./database.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+  binaryTargets = ["native","debian-openssl-1.1.x"]
+}
+
+model Volume {
+  id    Int   @id @default(autoincrement())
+  name  String @unique
+  path  String @unique
+}
+
+model MovieMetadata {
+  id                Int @id @default(autoincrement())
+
+  movie             Movie @relation(fields: [movieId], references: [id])
+  movieId           Int
+
+  quality           String
+  format            String
+  fps               Int
+
+  durationSeconds   Int
+  sizeInKB          Int
+}
+
+model Actress {
+  id                  Int @id @default(autoincrement())
+  name                String @unique
+  aliases             String @default("[]")
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
+  latitude            Float?
+  longitude           Float?
+
+  boobs               String?
+
+  piercings           String?
+  tattoos             String?
+
+  height              Int?
+  weight              Int?
+  measurements        String @default("[]")
+  cupsize             String?
+
+  socialMediaLinks    String?
+  officialWebsite     String?
+
+  movies              Movie[] @relation(references: [id])
+}
+
+model Movie {
+  id          Int @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+
+  title       String @unique
+  actresses   Actress[] @relation(references: [id])
+  // genres      Genre[]
+  // highlights  Highlight[]
+  actors      Int @default(0)
+  // website     Website
+  cover       Int @default(2)
+
+  path        String
+  volume      Volume @relation(fields: [volumeId], references: [id])
+  volumeId    Int
+
+  metadata    MovieMetadata?
+}
+
+model Settings {
+  id                 Int @id @default(autoincrement())
+  language           String
+  screencapPath      String?
+  actressImagePath   String?
+  inferMovieTitle    String @default("FILENAME")
+}
+
+model Task {
+  id            Int @id @default(autoincrement())
+  category      String
+  status        String
+  statusMessage String?
+  parameters    String?
+}
```


