import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      // GET ALL USERS
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }

    else if (httpMethod == 'POST') {
      const {username, password, email, type} = req.body
        // CREATE USER
        if (type == "superAdmin") {
          await prisma.superadmin.create({
            data: {
              FK: {
                 create: {
                  username: username,
                  email: email,
                  password: password, 
                  type: "superAdmin"
                 }
              }
            }})
        } else if (type == "admin") {
          await prisma.admin.create({
            data: {
              FK: {
                 create: {
                  username: username,
                  email: email,
                  password: password, 
                  type: "admin"
                 }
              },
            }, 
          })
        } else {
          await prisma.normalUser.create({
            data: {
              FK: {
                create: {
                  username: username,
                  email: email,
                  password: password, 
                  type: "normalUser"
                 }
              },
            }, 
          })
        }
      }

      else if (httpMethod == 'DELETE') {
        // DELETE USER
        const {email} = req.body
        const deleteUser = await prisma.user.delete({
          where: {
              email: email,
            },
          })
          res.status(200).json(deleteUser);
      }

      else if (httpMethod == 'PUT') {
        // UPDATE USER PASSWORD
        const {email, password} = req.body
        const updateUser = await prisma.user.update({
          where: {
              email: email,
            },
            data: {
              password: password
            },
          })
      res.status(200).json(updateUser)
        }

      else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`)
      }
    } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}