/*
  Warnings:

  - You are about to drop the column `duration` on the `MatchingGame` table. All the data in the column will be lost.
  - You are about to drop the `MatchingGameImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchingGameImage" DROP CONSTRAINT "MatchingGameImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "MatchingGameImage" DROP CONSTRAINT "MatchingGameImage_matchingGameId_fkey";

-- AlterTable
ALTER TABLE "MatchingGame" DROP COLUMN "duration";

-- DropTable
DROP TABLE "MatchingGameImage";

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
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesInCart" ADD CONSTRAINT "_CoursesInCart_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
