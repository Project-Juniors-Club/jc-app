import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createAdmin(req, res){
  const {username, password, email} = req.body
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
}

async function createSuperadmin(req, res){
  const {username, password, email} = req.body
  await prisma.superadmin.create({
    data: {
      FK: {
         create: {
          username: username,
          email: email,
          password: password, 
          type: "superAdmin"
         }
      },
    }, 
  })
}
    
async function createNormal(req, res){
  const {username, password, email} = req.body
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

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
  try {

    const httpMethod = req.method;
    const {username, password, email, type} = req.body

    switch (httpMethod) {
      // GET ALL USERS
      case 'GET':
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        break;

      case 'POST':
        // CREATE USER
        if (type == "superAdmin") {
          createSuperadmin;
        } else if (type == "admin") {
          createAdmin;
        } else {
          createNormal;
        }
        break;

      case 'DELETE':
        // DELETE USER
        const deleteUser = await prisma.user.delete({
          where: {
              email: email,
            },
          })
          res.status(200).json(deleteUser);
          break;

      case 'PUT':
        // UPDATE USER PASSWORD
        const updateUser = await prisma.user.update({
          where: {
              email: email,
            },
            data: {
              password: password
            },
          })
      res.status(200).json(updateUser)
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