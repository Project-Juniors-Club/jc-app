-- CreateTable
CREATE TABLE "SortingGame" (
    "gameId" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SortingGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "Bucket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortingGameId" TEXT NOT NULL,

    CONSTRAINT "Bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BucketItem" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "imageId" TEXT,
    "bucketId" TEXT NOT NULL,

    CONSTRAINT "BucketItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGameImage" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "SortingGameImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SortingGameImage_imageId_key" ON "SortingGameImage"("imageId");

-- AddForeignKey
ALTER TABLE "SortingGame" ADD CONSTRAINT "SortingGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bucket" ADD CONSTRAINT "Bucket_sortingGameId_fkey" FOREIGN KEY ("sortingGameId") REFERENCES "SortingGame"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketItem" ADD CONSTRAINT "BucketItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "SortingGameImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BucketItem" ADD CONSTRAINT "BucketItem_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameImage" ADD CONSTRAINT "SortingGameImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;
