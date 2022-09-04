import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {
    // DELETE
    const userEmail = JSON.parse(req.body);
    await prisma.user.delete({
        where: {
            email: userEmail,
          },
        })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}