import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = _req.method;
    
    if (httpMethod == 'GET') {
        const users = prisma.user.findMany()
        res.status(200).json(users);
    } else if (httpMethod == 'POST') {
        // INSERT CREATE USERS CODE HERE
        var {username, password, email, type} = _req.body
        const addedUser = await prisma.user.create({
          data: {
            username: username,
            password: password, 
            email: email, 
            type: type
          },
        });
        res.status(200).json({addedUser});
      } else if (httpMethod == 'PUT') {
          // UPDATE UPDATE USER PASSWORD WITH EMAIL
          var {email, password} = _req.body
          const updatedUser = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              password: password,
            },
          })
          res.status(200).json({updatedUser});
        } else if (httpMethod == 'DELETE') {
            // DELETE USER WITH EMAIL
            var {email} = _req.body
            const deletedUser = await prisma.user.delete({
              where: {
                email: email,
              },
            })
            res.status(200).json({deletedUser});
          } else {
              res.setHeader('Allow', ['GET', 'POST']);
              res.status(405).end(`Method ${httpMethod} not allowed`)
          }
      } catch (error) {
          console.log(error)
          res.status(400).json({ message: error })
  }
};
export default handler;

