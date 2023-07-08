import { Prisma, GameType, AssetType, SortingGame, Bucket, Image } from '@prisma/client';
import prisma from '../prisma';
import { deleteOldAsset } from './asset';

export type SerializedSortingGame = {
  duration: number;
  buckets: {
    name: string;
    bucketItems: {
      text: string;
      image?: {
        assetId: string;
      };
    }[];
  }[];
};

export const createSortingGame = async ({ duration, buckets }: SerializedSortingGame) => {
  return await prisma.sortingGame.create({
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
      duration: duration,
      buckets: {
        create: buckets.map((bucket, index) => ({
          name: bucket.name,
          bucketItems: {
            create: bucket.bucketItems.map((bucketItem, itemIndex) => ({
              text: bucketItem.text,
              image: bucketItem.image
                ? {
                    create: {
                      image: {
                        connect: {
                          assetId: bucketItem.image.assetId,
                        },
                      },
                    },
                  }
                : undefined,
            })),
          },
        })),
      },
    },
    include: {
      buckets: {
        include: {
          bucketItems: {
            include: {
              image: true,
            },
          },
        },
      },
    },
  });
};

export const updateSortingGame = async (gameId: string, { duration, buckets }: SerializedSortingGame) => {
  // First get all the old images, delete them, then update the sorting game items
  return await prisma.$transaction(async tx => {
    const oldSortingGameItems = await tx.bucketItem.findMany({
      where: {
        bucket: {
          sortingGameId: gameId,
        },
      },
      include: {
        image: true,
      },
      orderBy: {
        bucketId: 'asc',
        id: 'asc',
      },
    });

    // Delete old assets if necessary
    for (let i = 0; i < oldSortingGameItems.length; i++) {
      const oldBucketItem = oldSortingGameItems[i];
      const newBucket = buckets[i];

      // Delete old image if assetId has changed
      if (oldBucketItem.image && newBucket.bucketItems[i].image?.assetId !== oldBucketItem.image.imageId) {
        deleteOldAsset(oldBucketItem.image.imageId, AssetType.image, tx);
      }
    }

    // Update sorting game duration
    await prisma.sortingGame.update({
      where: {
        gameId: gameId,
      },
      data: {
        duration: duration,
      },
    });

    // Update sorting game items
    await Promise.all(
      buckets.map(async (bucket, index) => {
        const existingBucketItem = oldSortingGameItems[index];

        // Update existing bucket item if it exists
        if (existingBucketItem) {
          await prisma.bucketItem.update({
            where: {
              id: existingBucketItem.id,
            },
            data: {
              text: bucket.bucketItems[index].text,
              image: bucket.bucketItems[index].image
                ? {
                    connect: {
                      imageId: bucket.bucketItems[index].image.assetId,
                    },
                  }
                : undefined,
            },
          });
        }
        // Create new bucket item if it doesn't exist
        else {
          await prisma.bucket.create({
            data: {
              name: bucket.name,
              sortingGame: {
                connect: {
                  gameId: gameId,
                },
              },
              bucketItems: {
                create: bucket.bucketItems.map(bucketItem => ({
                  text: bucketItem.text,
                  image: bucketItem.image
                    ? {
                        create: {
                          imageId: bucketItem.image.assetId,
                        },
                      }
                    : undefined,
                })),
              },
            },
          });
        }
      }),
    );
  });
};
