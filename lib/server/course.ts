import { Course, CourseStatus, Image, Prisma } from '@prisma/client';
import prisma from '../prisma';

export type SerializedCourse = {
  price: number;
  createDate: string;
  lastUpdatedDate: string;
  id: string;
  title: string;
  description: string;
  learningObjectives: string;
  creatorId: string;
  lastUpdatedUserId: string;
  status: CourseStatus;
  categoryId: string;
  coverImageAssetId: string;
};

export type SerializedCourseWithCoverImage = SerializedCourse & { coverImage?: Image };

export type CourseWithCoverImage = Prisma.PromiseReturnType<typeof getCourseWithCoverImage>;

export const getCourseWithCoverImage = async (where?: Prisma.CourseWhereUniqueInput) => {
  return await prisma.course.findFirst({
    where,
    include: {
      coverImage: true,
    },
  });
};

export const findCourse = async (where?: Prisma.CourseWhereUniqueInput, select?: Prisma.CourseSelect) => {
  return await prisma.course.findFirst({
    where,
    select,
  });
};

export const serializeCourse = (course: Course | CourseWithCoverImage) => {
  return {
    ...course,
    price: course.price.toNumber(),
    createDate: course.createDate.toLocaleDateString(),
    lastUpdatedDate: course.createDate.toLocaleDateString(),
  };
};

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

export const getAllCourses = async () => {
  const courses = await prisma.course.findMany({
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
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  const result = courses.map(course => {
    return {
      ...course,
      price: course.price.toNumber(),
      createDate: course.createDate.toLocaleDateString(),
      lastUpdatedDate: course.createDate.toLocaleDateString(),
    };
  });
  return result;
};
