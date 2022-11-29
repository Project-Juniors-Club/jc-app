import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { updateImage, deleteImage, findUniqueImage } from '../../../lib/server/image';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('image');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const assetId = req.query.assetId as string;

    if (httpMethod == 'GET') {
      const image = await findUniqueImage({ assetId });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: image });
    } else if (httpMethod == 'DELETE') {
      const deletedImage = await deleteImage({ assetId });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deletedImage });
    } else if (httpMethod == 'PUT') {
      const { url } = req.body;
      const updatedImage = await updateImage({ assetId }, { url });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedImage });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    // TODO: replace these error messages with specific ones for GET, POST, PUT, DELETE
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
};

export default handler;
