import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import messages from '../../../utils/api-messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const httpMethod = req.method;
        if (httpMethod == 'GET') {
            const courses = await prisma.course.findMany();
            res.status(200).json({message: messages.getAllCoursesSuccess, data: courses});
        } else if (httpMethod == 'POST') {
            const { name, description, stars, adminId, price, subcategoryId, status } = req.body
            // CREATE COURSE
            const created = await prisma.course.create({
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                    createdBy: {
                        connect: {
                            userId: adminId
                        }
                    },
                    price: price,
                    subcategory: {
                        connect: {
                            id: subcategoryId
                        }
                    },
                    status
                },
            })
            res.status(200).json({message: messages.createCourseSuccess, data: created})
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${httpMethod} not allowed`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
} 