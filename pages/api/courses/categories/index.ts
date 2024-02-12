import { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../../utils/api-messages';
import prisma from '../../../../lib/prisma';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('category');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      // Get Categories
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { courses: true },
          },
        },
      });
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: categories });
    } else if (httpMethod == 'POST') {
      // Create Cateogry
      const { name, description } = req.body;
      const category = await prisma.category.create({
        data: {
          name: name,
          description: description,
        },
      });
      res.status(200).json({ message: entityMessageObj.createSuccess, data: category });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
