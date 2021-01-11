-- CreateTable
CREATE TABLE "Volume" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "fps" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "sizeInKB" INTEGER NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "aliases" TEXT NOT NULL DEFAULT '[]',
    "haircolor" TEXT,
    "eyecolor" TEXT,
    "dateOfBirth" DATETIME,
    "dateOfCareerstart" DATETIME,
    "dateOfRetirement" DATETIME,
    "dateOfDeath" DATETIME,
    "ethnicity" TEXT,
    "country" TEXT,
    "province" TEXT,
    "city" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "boobs" TEXT,
    "piercings" TEXT,
    "tattoos" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "measurements" TEXT NOT NULL DEFAULT '{}',
    "cupsize" TEXT,
    "socialMediaLinks" TEXT,
    "officialWebsite" TEXT
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "actors" INTEGER NOT NULL DEFAULT 0,
    "cover" INTEGER NOT NULL DEFAULT 2,
    "path" TEXT NOT NULL,
    "volumeId" INTEGER NOT NULL,
    FOREIGN KEY ("volumeId") REFERENCES "Volume" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "screencapPath" TEXT,
    "actressImagePath" TEXT,
    "genreImagePath" TEXT,
    "inferMovieTitle" TEXT NOT NULL DEFAULT 'FILENAME'
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "statusMessage" TEXT,
    "parameters" TEXT
);

-- CreateTable
CREATE TABLE "GenreDefinition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "timeStart" REAL NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "kinkiness" INTEGER NOT NULL,
    "validAsRoot" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "_ActressToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Actress" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Subgenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Volume.name_unique" ON "Volume"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Volume.path_unique" ON "Volume"("path");

-- CreateIndex
CREATE UNIQUE INDEX "MovieMetadata_movieId_unique" ON "MovieMetadata"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Actress.name_unique" ON "Actress"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Genre.name_unique" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ActressToMovie_AB_unique" ON "_ActressToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_ActressToMovie_B_index" ON "_ActressToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Subgenre_AB_unique" ON "_Subgenre"("A", "B");

-- CreateIndex
CREATE INDEX "_Subgenre_B_index" ON "_Subgenre"("B");
