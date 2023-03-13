-- AlterTable
ALTER TABLE "images" ADD COLUMN     "key" TEXT;

-- AlterTable
ALTER TABLE "normalUsers" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "pdpa" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "key" TEXT;
