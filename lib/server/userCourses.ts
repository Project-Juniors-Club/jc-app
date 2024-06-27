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
