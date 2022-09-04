import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';


export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {

    const httpMethod = req.method;
    const {username, password, email} = req.body

    switch (httpMethod) {
      case 'GET':
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;
      case 'POST':
        // INSERT CREATE USERS CODE HERE
      
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${httpMethod} not allowed`)
        
    }
  
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}