/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_ChapterToUserCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PageToUserCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToUserCourse_AB_unique" ON "_ChapterToUserCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_ChapterToUserCourse_B_index" ON "_ChapterToUserCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PageToUserCourse_AB_unique" ON "_PageToUserCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToUserCourse_B_index" ON "_PageToUserCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "_ChapterToUserCourse" ADD CONSTRAINT "_ChapterToUserCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToUserCourse" ADD CONSTRAINT "_ChapterToUserCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "userCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToUserCourse" ADD CONSTRAINT "_PageToUserCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToUserCourse" ADD CONSTRAINT "_PageToUserCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "userCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
