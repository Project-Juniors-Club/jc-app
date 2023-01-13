import { Prisma, GameType, AssetType, SortingGame, SortingGameObjectType } from '@prisma/client';
import prisma from '../prisma';

export type SerializedObjectBucketPair = {
  objects: {
    objectType: SortingGameObjectType;
    text: string | null;
    imageId: string | null;
  }[];
  bucket: {
    description: string;
  };
};

export const createSorting = async (description: string, correctPairs: SerializedObjectBucketPair[]) => {
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
      correctPairs: {
        create: correctPairs.map(pair => ({
          objects: {
            create: pair.objects.map(object => ({
              objectType: object.objectType,
              text: object.text,
              image: object.imageId && {
                connect: {
                  assetId: object.imageId,
                },
              },
            })),
          },
          bucket: pair.bucket
            ? {
                create: {
                  description: pair.bucket.description,
                },
              }
            : null,
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

export const findUniqueSorting = async (where: Prisma.SortingGameWhereUniqueInput, select?: Prisma.SortingGameSelect) => {
  return (await prisma.sortingGame.findUnique({
    where,
    select,
  })) as SortingGame;
};

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
