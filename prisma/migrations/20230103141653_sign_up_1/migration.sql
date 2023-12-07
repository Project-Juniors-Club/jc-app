/*
  Warnings:

  - You are about to drop the column `age` on the `normalUsers` table. All the data in the column will be lost.
  - You are about to drop the column `pdpa` on the `normalUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "normalUsers" DROP COLUMN "age",
DROP COLUMN "pdpa";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "pdpa" BOOLEAN NOT NULL DEFAULT false;
