import { AssetType, Prisma } from '@prisma/client';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

export const deleteOldAsset = async (oldAssetId: string, oldAssetType: AssetType, tx: Prisma.TransactionClient) => {
  if (oldAssetType === 'image') {
    const { key } = await tx.image.findUnique({ where: { assetId: oldAssetId }, select: { key: true } });
    s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: key }).send();
  }
  if (oldAssetType === 'video') {
    const { key } = await tx.video.findUnique({ where: { assetId: oldAssetId }, select: { key: true } });
    s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: key }).send();
  }
  await tx.asset.delete({
    where: {
      id: oldAssetId,
    },
  });
};
