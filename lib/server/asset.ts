import { AssetType, Prisma } from '@prisma/client';
import prisma from '../prisma';

export const deleteOldAsset = async (oldAssetId: string, oldAssetType: AssetType, tx: Prisma.TransactionClient) => {
  if (oldAssetType === 'article') {
    await tx.asset.delete({
      where: {
        id: oldAssetId,
      },
    });
  }
  // TODO: delete asset from S3 for iamge or video
};
