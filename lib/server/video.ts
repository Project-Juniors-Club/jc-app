import { Prisma, Video, AssetType } from '@prisma/client';
import prisma from '../prisma';

export const createVideo = async (url: string, assetId?: string, filename?: string, key?: string) => {
  return (await prisma.video.create({
    data: {
      asset: {
        connectOrCreate: {
          where: {
            id: assetId,
          },
          create: {
            assetType: AssetType.video,
          },
        },
      },
      url: url,
      filename: filename,
      key: key,
    },
  })) as Video;
};

export const findVideos = async (where?: Partial<Prisma.VideoWhereInput>, select?: Prisma.VideoSelect) => {
  return (await prisma.video.findMany({
    where,
    select,
  })) as Video[];
};

export const findUniqueVideo = async (where: Prisma.VideoWhereUniqueInput, select?: Prisma.VideoSelect) => {
  return (await prisma.video.findUnique({
    where,
    select,
  })) as Video;
};

export const updateVideo = async (
  where: Partial<Prisma.VideoWhereUniqueInput>,
  data: Prisma.VideoUpdateInput,
  select?: Prisma.VideoSelect,
) => {
  return (await prisma.video.update({
    where,
    data,
    select,
  })) as Video;
};

export const deleteVideo = async (where: Partial<Prisma.VideoWhereUniqueInput>, select?: Prisma.VideoSelect) => {
  return (await prisma.video.delete({
    where,
    select,
  })) as Video;
};
