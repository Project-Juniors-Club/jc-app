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

-- AlterTable
ALTER TABLE "SortingGame" DROP COLUMN "duration",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;

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

-- CreateTable
CREATE TABLE "_CoursesInCart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesInCart_AB_unique" ON "_CoursesInCart"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesInCart_B_index" ON "_CoursesInCart"("B");

-- AddForeignKey
ALTER TABLE "SortingGameBucket" ADD CONSTRAINT "SortingGameBucket_sortingGameId_fkey" FOREIGN KEY ("sortingGameId") REFERENCES "SortingGame"("gameId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameObject" ADD CONSTRAINT "SortingGameObject_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameObject" ADD CONSTRAINT "SortingGameObject_correctBucketId_fkey" FOREIGN KEY ("correctBucketId") REFERENCES "SortingGameBucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
