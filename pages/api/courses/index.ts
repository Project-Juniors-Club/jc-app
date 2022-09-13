import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const httpMethod = req.method;
        if (httpMethod == 'GET') {
            const courses = await prisma.course.findMany();
            res.status(200).json(courses);
        } else if (httpMethod == 'POST') {
            const { name, description, stars, adminId } = req.body
            // CREATE COURSE
            const created = await prisma.course.create({
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                    adminId: adminId,
                },
            })
            res.status(200).json(created)
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${httpMethod} not allowed`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
} 