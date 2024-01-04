import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';
import formidable from 'formidable';
import PersistentFile from 'formidable/PersistentFile';
import axios from 'axios';
import { S3 } from 'aws-sdk';
import { createReadStream, fstat, readFile } from 'fs';
import { file } from 'googleapis/build/src/apis/file';
import { deleteOldAsset } from '../../../../lib/server/asset';
import { updateDecorator } from 'typescript';

const s3 = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

const entityMessageObj = entityMessageCreator('page');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const pageId = req.query.id as string;

    if (httpMethod == 'GET') {
      // We might want to improve this to be used sync status between page editor and server state, but now not sure how this would be used
      const page = await prisma.page.findFirst({
        where: { id: pageId },
      });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: page });
    } else if (httpMethod == 'DELETE') {
      // DELETE PAGE
      const page = await prisma.page.delete({
        where: {
          id: pageId,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: page });
    } else if (httpMethod == 'PUT') {
      const { name, description, assetType, newAssetId, duration, updaterId } = req.body;
      const updatedPage = await prisma.$transaction(async tx => {
        const {
          assetId: oldAssetId,
          asset: { assetType: oldAssetType },
        } = await tx.page.findFirst({
          where: {
            id: pageId,
          },
          select: {
            assetId: true,
            asset: {
              select: {
                assetType: true,
              },
            },
          },
        });
        const updatedPage = await tx.page.update({
          where: {
            id: pageId,
          },
          data: {
            name: name,
            duration: duration,
            description: description,
            asset: {
              connect: {
                id: newAssetId,
              },
            },
            chapter: {
              update: {
                course: {
                  update: {
                    lastUpdatedBy: {
                      connect: {
                        userId: updaterId,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (oldAssetId != newAssetId) await deleteOldAsset(oldAssetId, oldAssetType, tx);
        return updatedPage;
      });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedPage });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
