/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `courses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "courses_title_key";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "coverImageUrl",
ADD COLUMN     "coverImageAssetId" TEXT;

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "filename" TEXT;

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "filename" TEXT;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_coverImageAssetId_fkey" FOREIGN KEY ("coverImageAssetId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;
