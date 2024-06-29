import { AssetType, Prisma } from '@prisma/client';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

export const deleteOldAsset = async (oldAssetId: string, oldAssetType: AssetType, tx: Prisma.TransactionClient) => {
  try {
    if (oldAssetType === 'image') {
      const image = await tx.image.findUnique({ where: { assetId: oldAssetId }, select: { key: true } });
      if (image) {
        await s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: image.key }).promise();
      } else {
        console.log(`Image with asset ID ${oldAssetId} not found.`);
      }
    }
    if (oldAssetType === 'video') {
      const video = await tx.video.findUnique({ where: { assetId: oldAssetId }, select: { key: true } });
      if (video) {
        await s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: video.key }).promise();
      } else {
        console.log(`Video with asset ID ${oldAssetId} not found.`);
      }
    }

    const game = await tx.game.findUnique({ where: { assetId: oldAssetId } });
    if (game) {
      await tx.game.delete({ where: { assetId: oldAssetId } });
    } else {
      console.log(`Game with asset ID ${oldAssetId} not found.`);
    }

    const asset = await tx.asset.findUnique({ where: { id: oldAssetId } });
    if (asset) {
      return await tx.asset.delete({ where: { id: oldAssetId } });
    } else {
      console.log(`Asset with ID ${oldAssetId} not found.`);
    }
  } catch (error) {
    console.error(`Failed to delete asset with ID ${oldAssetId}:`, error);
  }
};
