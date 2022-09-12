import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {

    const httpMethod = req.method;
    

    switch (httpMethod) {
      case 'GET':
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;

      case 'POST':
        // INSERT CREATE USERS CODE HERE
        var {username, password, email, type} = req.body
        const addedUser = await prisma.user.create({
          data: {
            username: username,
            password: password, 
            email: email, 
            type: type
          },
        });
        res.status(200).json({addedUser});
        break;

        case 'PUT':
          // UPDATE UPDATE USER PASSWORD
          var {email, password} = req.body
          const updatedUser = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              password: password,
            },
          })
          res.status(200).json({updatedUser});
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