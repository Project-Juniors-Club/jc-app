import { Prisma, GameType, AssetType, MatchingGame, QuizGameOptionType, Image } from '@prisma/client';
import s3 from 'aws-sdk/clients/s3';
import { NUM_MATCHING_IMAGES } from '../../components/matching-game-editor/Creator';
import prisma from '../prisma';
import { deleteOldAsset } from './asset';

export type SerializedMatchingGame = {
  duration: number;
  images: Image[];
};

export const createMatchingGame = async ({ duration, images }: SerializedMatchingGame) => {
  return (await prisma.matchingGame.create({
    data: {
      game: {
        create: {
          type: GameType.matchingGame,
          asset: {
            create: {
              assetType: AssetType.game,
            },
          },
        },
      },
      duration: duration,
      images: {
        create: images.map(({ assetId }, idx) => ({
          index: idx,
          image: {
            connect: {
              assetId: assetId,
            },
          },
        })),
      },
    },
  })) as MatchingGame;
};

export const findUniqueMatchingGame = async (gameId: string) => {
  return await prisma.matchingGame.findUnique({
    where: {
      gameId: gameId,
    },
    include: {
      images: {
        include: {
          image: true,
        },
        orderBy: {
          index: 'asc',
        },
      },
    },
  });
};

export const updateMatchingGame = async (gameId: string, { duration, images }: SerializedMatchingGame) => {
  // in a prisma transaction, first get all the old images, delete them from s3, then only update the images
  return await prisma.$transaction(async tx => {
    const oldImages = (
      await tx.matchingGame.findUnique({
        where: {
          gameId: gameId,
        },
        include: {
          images: {
            include: {
              image: true,
            },
            orderBy: {
              index: 'asc',
            },
          },
        },
      })
    ).images;
    for (let i = 0; i < NUM_MATCHING_IMAGES; i++) {
      if (oldImages[i].image.assetId !== images[i].assetId) {
        deleteOldAsset(oldImages[i].image.assetId, AssetType.image, tx);
      }
    }
    return await prisma.matchingGame.update({
      where: {
        gameId: gameId,
      },
      data: {
        duration: duration,
        images: {
          deleteMany: {},
          create: images.map(({ assetId }, idx) => ({
            index: idx,
            image: {
              connect: {
                assetId: assetId,
              },
            },
          })),
        },
      },
    });
  });
};

export const deleteMatchingGame = async (gameId: string) => {
  return await prisma.$transaction(async tx => {
    const oldImages = (
      await tx.matchingGame.findUnique({
        where: {
          gameId: gameId,
        },
        include: {
          images: {
            include: {
              image: true,
            },
            orderBy: {
              index: 'asc',
            },
          },
        },
      })
    ).images;
    for (let i = 0; i < NUM_MATCHING_IMAGES; i++) {
      deleteOldAsset(oldImages[i].image.assetId, AssetType.image, tx);
    }
    return await prisma.matchingGame.delete({
      where: {
        gameId: gameId,
      },
    });
  });
};
