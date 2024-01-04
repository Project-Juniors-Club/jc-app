/*
  Warnings:

  - You are about to drop the column `differences` on the `SpotTheDifferenceGame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SpotTheDifferenceGame" DROP COLUMN "differences";

-- CreateTable
CREATE TABLE "SpotTheDifferenceRegion" (
    "id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "SpotTheDifferenceRegion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpotTheDifferenceRegion" ADD CONSTRAINT "SpotTheDifferenceRegion_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "SpotTheDifferenceGame"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
