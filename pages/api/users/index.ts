import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../interfaces';
import prisma from '../../../lib/prisma';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users: User[] = await prisma.user.findMany();
    if (!users) {
      throw new Error('Cannot find user data');
    }

    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
