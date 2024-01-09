/*
  Warnings:

  - You are about to drop the column `duration` on the `SortingGame` table. All the data in the column will be lost.
  - You are about to drop the `Bucket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BucketItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SortingGameImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `SortingGame` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SortingGameObjectType" AS ENUM ('text', 'image');

-- DropForeignKey
ALTER TABLE "Bucket" DROP CONSTRAINT "Bucket_sortingGameId_fkey";

-- DropForeignKey
ALTER TABLE "BucketItem" DROP CONSTRAINT "BucketItem_bucketId_fkey";

-- DropForeignKey
ALTER TABLE "BucketItem" DROP CONSTRAINT "BucketItem_imageId_fkey";

-- DropForeignKey
ALTER TABLE "SortingGameImage" DROP CONSTRAINT "SortingGameImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_courseId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_chapterId_fkey";

-- AlterTable
ALTER TABLE "SortingGame" DROP COLUMN "duration",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bucket";

-- DropTable
DROP TABLE "BucketItem";

-- DropTable
DROP TABLE "SortingGameImage";

-- CreateTable
CREATE TABLE "SortingGameBucket" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortingGameId" TEXT,

    CONSTRAINT "SortingGameBucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGameObject" (
    "id" TEXT NOT NULL,
    "objectType" "SortingGameObjectType" NOT NULL,
    "text" TEXT,
    "imageId" TEXT,
    "correctBucketId" TEXT NOT NULL,

    CONSTRAINT "SortingGameObject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameBucket" ADD CONSTRAINT "SortingGameBucket_sortingGameId_fkey" FOREIGN KEY ("sortingGameId") REFERENCES "SortingGame"("gameId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameObject" ADD CONSTRAINT "SortingGameObject_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameObject" ADD CONSTRAINT "SortingGameObject_correctBucketId_fkey" FOREIGN KEY ("correctBucketId") REFERENCES "SortingGameBucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
