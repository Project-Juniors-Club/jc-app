import prisma from '../prisma';

export const isCoursePurchased = async (userId: string, courseId: string) => {
  const userCourse = await prisma.userCourse.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });
  return userCourse !== null;
};

export const getUserCourseId = async (userId: string, courseId: string) => {
  const userCourse = await prisma.userCourse.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });
  return userCourse?.id;
};

export const isChapterCompleted = async (userCourseId: string, chapterId: string) => {
  const userCourse = await prisma.userCourse.findUnique({
    where: { id: userCourseId },
    include: { completedChapters: true },
  });

  const isCompleted = userCourse?.completedChapters.some(chapter => chapter.id === chapterId) || false;
  return isCompleted;
};

export const isPageCompleted = async (userCourseId: string, pageId: string) => {
  const userCourse = await prisma.userCourse.findUnique({
    where: { id: userCourseId },
    include: { completedPages: true },
  });

  const isCompleted = userCourse?.completedPages.some(page => page.id === pageId) || false;
  return isCompleted;
};
