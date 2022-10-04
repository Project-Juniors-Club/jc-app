import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { updateImage, deleteImage, findUniqueImage } from '../../../lib/server/image';
import messages from '../../../utils/api-messages';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const image = await findUniqueImage({ id });
      res.status(200).json({ message: messages.getOneImageSuccess, data: image });
    } else if (httpMethod == 'DELETE') {
      const deletedImage = await deleteImage({ id });
      res.status(200).json({ message: messages.deleteImageSuccess });
    } else if (httpMethod == 'PUT') {
      const { url } = req.body;
      const updatedImage = await updateImage({ id }, { url });
      res.status(200).json({ message: messages.updateImageSuccess, data: updatedImage });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    // TODO: replace these error messages with specific ones for GET, POST, PUT, DELETE
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default handler;
