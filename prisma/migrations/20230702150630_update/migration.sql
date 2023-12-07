/*
  Warnings:

  - You are about to drop the `_CoursesInCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `MatchingGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CoursesInCart" DROP CONSTRAINT "_CoursesInCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesInCart" DROP CONSTRAINT "_CoursesInCart_B_fkey";

-- AlterTable
ALTER TABLE "MatchingGame" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_CoursesInCart";

-- CreateTable
CREATE TABLE "MatchingGameImage" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "imageId" TEXT NOT NULL,
    "matchingGameId" TEXT NOT NULL,

    CONSTRAINT "MatchingGameImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchingGameImage_imageId_key" ON "MatchingGameImage"("imageId");

-- AddForeignKey
ALTER TABLE "MatchingGameImage" ADD CONSTRAINT "MatchingGameImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchingGameImage" ADD CONSTRAINT "MatchingGameImage_matchingGameId_fkey" FOREIGN KEY ("matchingGameId") REFERENCES "MatchingGame"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;
