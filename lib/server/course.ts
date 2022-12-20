import prisma from '../prisma';

export const getCourseWithAuthorAndDate = async (id: string) => {
  const course = await prisma.course.findFirst({
    where: { id: id },
    include: {
      createdBy: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      lastUpdatedBy: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      coverImage: {
        select: {
          url: true,
        },
      },
    },
  });
  const result = {
    ...course,
    price: course.price.toNumber(),
    createDate: course.createDate.toLocaleDateString(),
    lastUpdatedDate: course.createDate.toLocaleDateString(),
  };
  return result;
};
