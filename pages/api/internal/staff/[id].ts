import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('admin');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const httpMethod = req.method;
  const id = req.query.id as string;

  try {
    if (httpMethod == 'GET') {
      const admin = await prisma.admin.findFirst({
        where: { userId: id },
        select: {
          user: {
            select: {
              name: true,
              type: true,
              email: true,
            },
          },
          role: true,
          disabled: true,
        },
      });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: admin });
    } else if (httpMethod == 'PUT') {
      const { role, name, disabled } = req.body;
      const updatedUser = await prisma.admin.update({
        where: {
          userId: id,
        },
        data: {
          role: role,
          disabled: disabled,
          user: {
            update: {
              name: name,
            },
          },
        },
      });

      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedUser });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
