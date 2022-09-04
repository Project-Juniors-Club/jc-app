import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

async function createAdmin(req, res){
  const {username, password, email} = req.body
  await prisma.admin.create({
    data: {
      FK: {
         create: {
          username: username,
          email: email,
          password: password, 
        
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
         }
      },
    }, 
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
  const {username, password, email} = req.body

  try {
    // CREATE
    // To check: Do we use same or different end points?
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password, 
      }
    })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}