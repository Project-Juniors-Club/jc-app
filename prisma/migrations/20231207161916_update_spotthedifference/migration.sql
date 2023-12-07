/*
  Warnings:

  - You are about to drop the `SpotTheDifference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpotTheDifference" DROP CONSTRAINT "SpotTheDifference_gameId_fkey";

-- DropTable
DROP TABLE "SpotTheDifference";

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
