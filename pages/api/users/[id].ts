import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('user');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const user = await prisma.user.findFirst({
        where: { id: id },
      });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: user });
    } else if (httpMethod == 'DELETE') {
      // DELETE USER
      const deleteUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deleteUser });
    } else if (httpMethod == 'PUT') {
      // UPDATE UPDATE USER PASSWORD WITH EMAIL
      const { email } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: email,
        },
      });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedUser });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
