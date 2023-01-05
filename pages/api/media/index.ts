import { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../utils/api-messages';
import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import prisma from '../../../lib/prisma';
import { AssetType } from '@prisma/client';
import { createImage } from '../../../lib/server/image';
import { createVideo } from '../../../lib/server/video';

const entityMessageObj = entityMessageCreator('file');

const s3 = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

const BUCKET_URL = 'https://juniors-club.s3.ap-southeast-1.amazonaws.com/';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5gb',
    },
  },
};

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  const getFileParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.body,
    Expires: 120,
  };

  try {
    if (method === 'GET') {
      // for postman usage only
      const url = await s3.getSignedUrlPromise('getObject', getFileParams);
      res.status(200).json({ message: entityMessageObj.getOneSuccess, url: url });
    } else if (method === 'PUT') {
      const { name: filename, type: ContentType } = req.body;

      const [assetType, extension] = ContentType.split('/');

      if (assetType != AssetType.image && assetType != AssetType.video) {
        throw 'Unsupported file type';
      }

      // if we make url optional this one can actually be avoided altogether, possible TODO
      const asset = await prisma.asset.create({ data: { assetType: assetType } });

      // need to store Key for deletion in the future
      const Key = `${asset.id}.${extension}`;

      // after uploading to s3, this url will be used to access the data
      const resourceUrl = BUCKET_URL + Key;

      const uploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: Key,
        Expires: 120,
        ContentType: ContentType,
      });

      if (assetType == AssetType.image) {
        await createImage(resourceUrl, asset.id, filename, Key);
      }

      if (assetType == AssetType.video) {
        await createVideo(resourceUrl, asset.id, filename, Key);
      }

      // for "uploads/upload" use
      res.status(200).json({ message: entityMessageObj.createSuccess, uploadUrl: uploadUrl, assetId: asset.id });
    } else if (method === 'DELETE') {
      // for postman usage only
      const url = await s3.getSignedUrlPromise('deleteObject', getFileParams);
      res.status(200).json({ message: entityMessageObj.deleteSuccess, url: url });
    } else {
      res.status(405).end(`Method ${method} not allowed`);
    }
  } catch (err) {
    console.log(err);
    if (method == 'GET') {
      res.status(500).json({ message: entityMessageObj.getOneFailed });
    } else if (method == 'POST') {
      res.status(500).json({ message: entityMessageObj.createFailed });
    } else if (method == 'DELETE') {
      res.status(500).json({ message: entityMessageObj.deleteFailed });
    } else {
      res.status(500).end(`Method ${method} failed`);
    }
  }
}
