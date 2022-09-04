import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {
    // UPDATE PASSWORD
    const userData = JSON.parse(req.body);
    await prisma.user.update({
        where: {
            email: userData.email,
          },
          data: {
            password: userData.password
          },
        })
    res.status(200).json({ message: 'Password updated' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}