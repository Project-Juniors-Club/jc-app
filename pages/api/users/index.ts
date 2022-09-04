import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import prisma from '../../../lib/prisma';

const handler = async(_req: NextApiRequest, res: NextApiResponse) => {
  // GET ALL USERS
  try {
    // if (!Array.isArray(sampleUserData)) {
    //   throw new Error('Cannot find user data');
    // }
    const feed = await prisma.user.findMany();

    res.status(200).json(feed);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
