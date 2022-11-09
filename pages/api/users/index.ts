import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../interfaces';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('user');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const users: User[] = await prisma.user.findMany();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: users });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
};

export default handler;
