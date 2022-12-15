import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';

const entityMessageObj = entityMessageCreator('user');

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = _req.method;
  try {
    if (httpMethod == 'GET') {
      const users = prisma.user.findMany();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: users });
    } else if (httpMethod == 'POST') {
      // INSERT CREATE USERS CODE HERE
      var { email, type } = _req.body;
      const addedUser = await prisma.user.create({
        data: {
          email: email,
          type: type,
        },
      });
      res.status(200).json({ message: entityMessageObj.createSuccess, data: addedUser });
    } else if (httpMethod == 'PUT') {
      // UPDATE UPDATE USER PASSWORD WITH EMAIL
      var { email } = _req.body;
      const updatedUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          email: email,
        },
      });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedUser });
    } else if (httpMethod == 'DELETE') {
      // DELETE USER WITH EMAIL
      var { email } = _req.body;
      const deletedUser = await prisma.user.delete({
        where: {
          email: email,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deletedUser });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    if (httpMethod == 'GET') {
      res.status(500).json({ message: entityMessageObj.getAllFailed });
    } else if (httpMethod == 'POST') {
      res.status(500).json({ message: entityMessageObj.createFailed });
    } else if (httpMethod == 'PUT') {
      res.status(500).json({ message: entityMessageObj.updateFailed });
    } else if (httpMethod == 'DELETE') {
      res.status(500).json({ message: entityMessageObj.deleteFailed });
    } else {
      res.status(500).end(`Method ${httpMethod} failed`);
    }
  }
};
export default handler;
