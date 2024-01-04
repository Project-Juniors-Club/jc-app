/*
  Warnings:

  - You are about to drop the `SpotTheDifferenceRegion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoursesInCart` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SpotTheDifferenceRegion" DROP CONSTRAINT "SpotTheDifferenceRegion_gameId_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesInCart" DROP CONSTRAINT "_CoursesInCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursesInCart" DROP CONSTRAINT "_CoursesInCart_B_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_assetId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_chapterId_fkey";

-- AlterTable
ALTER TABLE "SpotTheDifferenceGame" ADD COLUMN     "differences" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "SpotTheDifferenceRegion";

-- DropTable
DROP TABLE "_CoursesInCart";

-- CreateIndex
CREATE UNIQUE INDEX "games_assetId_key" ON "games"("assetId");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
