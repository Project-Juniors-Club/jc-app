import { Prisma, GameType, AssetType, SortingGame, SortingGameObjectType, Image } from '@prisma/client';
import prisma from '../prisma';

export type SerializedSortingGameObject = {
  objectType: SortingGameObjectType;
  text: string | null;
  image: Image | null;
};

export type SerializedBucket = {
  description: string;
  sortingGameObjects: SerializedSortingGameObject[];
};

export const createSorting = async (description: string, sortingGameBuckets: SerializedBucket[]) => {
  return (await prisma.sortingGame.create({
    data: {
      game: {
        create: {
          type: GameType.sortingGame,
          asset: {
            create: {
              assetType: AssetType.game,
            },
          },
        },
      },
      description,
      sortingGameBuckets: {
        create: sortingGameBuckets.map(bucket => ({
          description: bucket.description,
          sortingGameObjects: {
            create: bucket.sortingGameObjects.map(object => ({
              objectType: object.objectType,
              text: object.text,
              image: object.image && {
                connect: {
                  assetId: object.image.assetId,
                },
              },
            })),
          },
        })),
      },
    },
  })) as SortingGame;
};

export const findSorting = async (where?: Partial<Prisma.SortingGameWhereInput>, select?: Prisma.SortingGameSelect) => {
  return (await prisma.sortingGame.findMany({
    where,
    select,
  })) as SortingGame[];
};

export const findUniqueSorting = async (gameId: string) => {
  return await prisma.sortingGame.findUnique({
    where: {
      gameId: gameId,
    },
    include: {
      sortingGameBuckets: {
        include: {
          sortingGameObjects: {
            include: {
              image: true,
            },
          },
        },
      },
    },
  });
}

export const updateSorting = async (
  where: Partial<Prisma.SortingGameWhereUniqueInput>,
  data: Prisma.SortingGameUpdateInput,
  select?: Prisma.SortingGameSelect,
) => {
  return (await prisma.sortingGame.update({
    where,
    data,
    select,
  })) as SortingGame;
};

export const deleteSorting = async (where: Partial<Prisma.SortingGameWhereUniqueInput>, select?: Prisma.SortingGameSelect) => {
  return (await prisma.sortingGame.delete({
    where,
    select,
  })) as SortingGame;
};
