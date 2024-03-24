import { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../../utils/api-messages';
import prisma from '../../../../lib/prisma';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('category');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const categoryId = req.query.id as string;

    if (httpMethod == 'GET') {
      // Get Category
      const category = await prisma.category.findFirst({
        where: { id: categoryId },
        include: { courses: true },
      });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: category });
    } else if (httpMethod == 'DELETE') {
      // Delete Category
      const category = await prisma.category.delete({
        where: { id: categoryId },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: category });
    } else if (httpMethod == 'PUT') {
      // Update Category
      const { name, description } = req.body;
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: {
          name: name,
          description: description,
        },
      });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedCategory });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
