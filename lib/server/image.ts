import { Prisma, Image } from '@prisma/client';
import prisma from '../prisma';

export const createImageInCourse = async (url: string, name: string, description: string, pageNumber: number, courseId: string) => {
  return (await prisma.image.create({
    data: {
      url,
      courseItem: {
        create: {
          name,
          description,
          pageNumber,
          type: CourseItemType.image,
          courseId,
        },
      },
    },
  })) as Image;
};

export const createImage = async (url: string) => {
  return (await prisma.image.create({
    data: {
      url,
    },
  })) as Image;
};

export const findImages = async (where?: Partial<Prisma.ImageWhereInput>, select?: Prisma.ImageSelect) => {
  return (await prisma.image.findMany({
    where,
    select,
  })) as Image[];
};

export const findUniqueImage = async (where: Prisma.ImageWhereUniqueInput, select?: Prisma.ImageSelect) => {
  return (await prisma.image.findUnique({
    where,
    select,
  })) as Image;
};

export const updateImage = async (
  where: Partial<Prisma.ImageWhereUniqueInput>,
  data: Prisma.ImageUpdateInput,
  select?: Prisma.ImageSelect,
) => {
  return (await prisma.image.update({
    where,
    data,
    select,
  })) as Image;
};

export const deleteImage = async (where: Partial<Prisma.ImageWhereUniqueInput>, select?: Prisma.ImageSelect) => {
  return (await prisma.image.delete({
    where,
    select,
  })) as Image;
};
