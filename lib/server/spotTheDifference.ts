import { Prisma, SpotTheDifferenceGame, GameType, AssetType, SpotTheDifference } from '@prisma/client';
import prisma from '../prisma';

export const createSpotTheDiff = async (rightImageId: string, leftImageId: string) => {
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
    },
  })) as SpotTheDifferenceGame;
};

async function createDifferences(gameId: string, differences: SpotTheDifference[]) {
  const differenceObjects = differences.map(difference => {
    return {
      x: difference.x,
      y: difference.y,
      width: difference.width,
      height: difference.height,
      game: {
        connect: {
          gameId,
        },
      },
    };
  });

  const createdDifferences = differenceObjects.map(async difference => {
    const createdDifference = await prisma.spotTheDifference.create({
      data: difference,
    });
    return createdDifference;
  });

  return createdDifferences;
}

export async function createSpotTheDifferenceGameWithDifferences(
  leftImageId: string,
  rightImageId: string,
  differences: SpotTheDifference[],
) {
  const spotTheDifferenceGame = await createSpotTheDiff(leftImageId, rightImageId);
  const createdDifferences = await createDifferences(spotTheDifferenceGame.gameId, differences);

  return {
    spotTheDifferenceGame,
    differences: createdDifferences,
  };
}

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
