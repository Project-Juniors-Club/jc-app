import { Prisma, Video, AssetType } from '@prisma/client';
import prisma from '../prisma';

export const createVideo = async (url: string, assetId?: string, filename?: string, key?: string) => {
  return (await prisma.image.create({
    data: {
      asset: {
        connectOrCreate: {
          where: {
            id: assetId,
          },
          create: {
            assetType: AssetType.image,
          },
        },
      },
      url: url,
      filename: filename,
      key: key,
    },
  })) as Video;
};

export const findVideos = async (where?: Partial<Prisma.ImageWhereInput>, select?: Prisma.ImageSelect) => {
  return (await prisma.image.findMany({
    where,
    select,
  })) as Video[];
};

export const findUniqueVideo = async (where: Prisma.ImageWhereUniqueInput, select?: Prisma.ImageSelect) => {
  return (await prisma.image.findUnique({
    where,
    select,
  })) as Video;
};

export const updateVideo = async (
  where: Partial<Prisma.VideoWhereUniqueInput>,
  data: Prisma.VideoUpdateInput,
  select?: Prisma.VideoSelect,
) => {
  return (await prisma.image.update({
    where,
    data,
    select,
  })) as Video;
};

export const deleteVideo = async (where: Partial<Prisma.ImageWhereUniqueInput>, select?: Prisma.ImageSelect) => {
  return (await prisma.image.delete({
    where,
    select,
  })) as Video;
};
