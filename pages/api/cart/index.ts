import type { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import prisma from '../../../lib/prisma';

const entityMessageObj = entityMessageCreator('cart');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const { userId } = req.body;
      const user = prisma.user.findFirst({
        where: { id: userId },
        include: { coursesInCart: true },
      });
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: user.coursesInCart });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
