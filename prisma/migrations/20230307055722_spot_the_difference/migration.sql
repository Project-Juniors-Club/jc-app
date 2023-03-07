/*
  Warnings:

  - The values [superAdmin] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `differences` on the `SpotTheDifferenceGame` table. All the data in the column will be lost.
  - You are about to drop the column `assetType` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the `PageItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SortingGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `superAdmins` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `pages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assetId` to the `pages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSeenBy` to the `userCourses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuizGameOptionType" AS ENUM ('text', 'image', 'textAndImage');

-- AlterEnum
ALTER TYPE "GameType" ADD VALUE 'quizGame';

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('normalUser', 'admin', 'courseEditor', 'staff');
ALTER TABLE "users" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "users" ALTER COLUMN "type" SET DEFAULT 'normalUser';
COMMIT;

-- DropForeignKey
ALTER TABLE "PageItem" DROP CONSTRAINT "PageItem_assetId_fkey";

-- DropForeignKey
ALTER TABLE "PageItem" DROP CONSTRAINT "PageItem_pageId_fkey";

-- DropForeignKey
ALTER TABLE "SortingGame" DROP CONSTRAINT "SortingGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "superAdmins" DROP CONSTRAINT "superAdmins_userId_fkey";

-- AlterTable
ALTER TABLE "SpotTheDifferenceGame" DROP COLUMN "differences";

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Staff';

-- AlterTable
ALTER TABLE "pages" DROP COLUMN "assetType",
ADD COLUMN     "assetId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userCourses" ADD COLUMN     "lastSeenBy" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "PageItem";

-- DropTable
DROP TABLE "SortingGame";

-- DropTable
DROP TABLE "superAdmins";

-- CreateTable
CREATE TABLE "courseEditors" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "courseEditors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotTheDifference" (
    "id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "SpotTheDifference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizGame" (
    "gameId" TEXT NOT NULL,

    CONSTRAINT "QuizGame_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "QuizGameQuestion" (
    "id" TEXT NOT NULL,
    "questionNumber" INTEGER NOT NULL,
    "isMultipleResponse" BOOLEAN NOT NULL,
    "questionTitle" TEXT NOT NULL,
    "imageId" TEXT,
    "quizGameId" TEXT NOT NULL,

    CONSTRAINT "QuizGameQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizGameOption" (
    "id" TEXT NOT NULL,
    "isCorrectOption" BOOLEAN NOT NULL,
    "quizGameOptionType" "QuizGameOptionType" NOT NULL,
    "optionText" TEXT,
    "optionImageId" TEXT,
    "quizGameQuestionId" TEXT NOT NULL,

    CONSTRAINT "QuizGameOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courseEditors_adminId_courseId_key" ON "courseEditors"("adminId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "pages_assetId_key" ON "pages"("assetId");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseEditors" ADD CONSTRAINT "courseEditors_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseEditors" ADD CONSTRAINT "courseEditors_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotTheDifference" ADD CONSTRAINT "SpotTheDifference_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "SpotTheDifferenceGame"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGame" ADD CONSTRAINT "QuizGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("assetId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameQuestion" ADD CONSTRAINT "QuizGameQuestion_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameQuestion" ADD CONSTRAINT "QuizGameQuestion_quizGameId_fkey" FOREIGN KEY ("quizGameId") REFERENCES "QuizGame"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameOption" ADD CONSTRAINT "QuizGameOption_optionImageId_fkey" FOREIGN KEY ("optionImageId") REFERENCES "images"("assetId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizGameOption" ADD CONSTRAINT "QuizGameOption_quizGameQuestionId_fkey" FOREIGN KEY ("quizGameQuestionId") REFERENCES "QuizGameQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
