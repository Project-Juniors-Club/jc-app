import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';
import { getSession } from 'next-auth/react';
import { UserType } from '@prisma/client';

const entityMessageObj = entityMessageCreator('admin');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  console.log(JSON.stringify(session));

  // Verify user is an admin
  if (session.user?.type !== UserType.admin) {
    res.status(200).json({
      error: 'You must be an admin to use this API.',
      session: JSON.stringify(session)
    })
  }

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
    } else if (httpMethod == 'DELETE') {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deleteUser });
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
        select: {
          user: {
            select: {
              name: true,
            },
          },
          role: true,
          disabled: true,
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
