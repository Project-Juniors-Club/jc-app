import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(
    // GET ONE USER
    req: NextApiRequest, res: NextApiResponse
) {
  try {
    const username = JSON.parse(req.body);
    await prisma.user.delete({
        where: {
            username: username,
          },
        })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}