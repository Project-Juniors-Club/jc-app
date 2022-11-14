import { Prisma, SpotTheDifferenceGame, GameType, AssetType } from '@prisma/client';
import prisma from '../prisma';

export const createSpotTheDiff = async (rightImageId: string, leftImageId: string, differences: number[]) => {
  return (await prisma.spotTheDifferenceGame.create({
    data: {
      rightImage: {
        connect: {
          assetId: rightImageId,
        },
      },
      leftImage: {
        connect: {
          assetId: leftImageId,
        },
      },
      game: {
        create: {
          type: GameType.spotTheDifferenceGame,
          asset: {
            create: {
              assetType: AssetType.game,
            },
          },
        },
      },
      differences,
    },
  })) as SpotTheDifferenceGame;
};

export const findSpotTheDiff = async (
  where?: Partial<Prisma.SpotTheDifferenceGameWhereInput>,
  select?: Prisma.SpotTheDifferenceGameSelect,
) => {
  return (await prisma.spotTheDifferenceGame.findMany({
    where,
    select,
  })) as SpotTheDifferenceGame[];
};

export const findUniqueSpotTheDiff = async (
  where: Prisma.SpotTheDifferenceGameWhereUniqueInput,
  select?: Prisma.SpotTheDifferenceGameSelect,
) => {
  return (await prisma.spotTheDifferenceGame.findUnique({
    where,
    select,
  })) as SpotTheDifferenceGame;
};

export const updateSpotTheDiff = async (
  where: Partial<Prisma.SpotTheDifferenceGameWhereUniqueInput>,
  data: Prisma.SpotTheDifferenceGameUpdateInput,
  select?: Prisma.SpotTheDifferenceGameSelect,
) => {
  return (await prisma.spotTheDifferenceGame.update({
    where,
    data,
    select,
  })) as SpotTheDifferenceGame;
};

export const deleteSpotTheDiff = async (
  where: Partial<Prisma.SpotTheDifferenceGameWhereUniqueInput>,
  select?: Prisma.SpotTheDifferenceGameSelect,
) => {
  return (await prisma.spotTheDifferenceGame.delete({
    where,
    select,
  })) as SpotTheDifferenceGame;
};
