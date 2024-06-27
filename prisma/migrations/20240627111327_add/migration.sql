/*
  Warnings:

  - You are about to drop the `_ChapterToUserCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PageToUserCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChapterToUserCourse" DROP CONSTRAINT "_ChapterToUserCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChapterToUserCourse" DROP CONSTRAINT "_ChapterToUserCourse_B_fkey";

-- DropForeignKey
ALTER TABLE "_PageToUserCourse" DROP CONSTRAINT "_PageToUserCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_PageToUserCourse" DROP CONSTRAINT "_PageToUserCourse_B_fkey";

-- DropTable
DROP TABLE "_ChapterToUserCourse";

-- DropTable
DROP TABLE "_PageToUserCourse";

-- CreateTable
CREATE TABLE "_CompletedChapters" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompletedPages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompletedChapters_AB_unique" ON "_CompletedChapters"("A", "B");

-- CreateIndex
CREATE INDEX "_CompletedChapters_B_index" ON "_CompletedChapters"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompletedPages_AB_unique" ON "_CompletedPages"("A", "B");

-- CreateIndex
CREATE INDEX "_CompletedPages_B_index" ON "_CompletedPages"("B");

-- AddForeignKey
ALTER TABLE "_CompletedChapters" ADD CONSTRAINT "_CompletedChapters_A_fkey" FOREIGN KEY ("A") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletedChapters" ADD CONSTRAINT "_CompletedChapters_B_fkey" FOREIGN KEY ("B") REFERENCES "userCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletedPages" ADD CONSTRAINT "_CompletedPages_A_fkey" FOREIGN KEY ("A") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletedPages" ADD CONSTRAINT "_CompletedPages_B_fkey" FOREIGN KEY ("B") REFERENCES "userCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
