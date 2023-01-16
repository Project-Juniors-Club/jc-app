import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { getSession } from 'next-auth/react';
import { UserType } from '@prisma/client';

const entityMessageObj = entityMessageCreator('admin');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const httpMethod = req.method;
  const session = await getSession({ req });
  console.log(JSON.stringify(session));

  // Verify user is an Admin
  // if (session.user?.type !== UserType.admin) {
  //   res.status(200).json({
  //     error: 'You must be an admin to use this API.',
  //     session: JSON.stringify(session),
  //   });
  // }

  try {
    if (httpMethod == 'GET') {
      var { email, userType, name, role, disabled } = req.body;

      const admin = await prisma.admin.findMany({
        where: {
          role: {
            contains: role,
          },
          disabled: {
            equals: disabled,
          },
          user: {
            email: {
              contains: email,
            },
            type: {
              equals: userType,
            },
            name: {
              contains: name,
            },
          },
        },
        select: {
          user: {
            select: {
              name: true,
              type: true,
              email: true,
            },
          },
          userId: true,
          role: true,
          disabled: true,
        },
      });
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: admin });
    } else if (httpMethod == 'POST') {
      var { email, userType, name, role } = req.body;
      var addedAdmin = await prisma.admin.create({
        data: {
          role: role,
          user: {
            create: {
              email: email,
              type: userType,
              name: name,
            },
          },
        },
        select: {
          user: {
            select: {
              name: true,
              type: true,
              email: true,
            },
          },
          userId: true,
          role: true,
          disabled: true,
        },
      });
      res.status(200).json({ message: entityMessageObj.createSuccess, data: addedAdmin });
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
    } else {
      res.status(500).end(`Method ${httpMethod} failed`);
    }
  }
};

export default handler;
