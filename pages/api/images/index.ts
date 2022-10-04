import type { NextApiRequest, NextApiResponse } from 'next';
import { findImages, createImage } from '../../../lib/server/image';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const images = await findImages();
      res.status(200).json(images);
    } else if (httpMethod == 'POST') {
      const { url } = req.body;
      const created = await createImage(url);
      res.status(200).json(created);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
