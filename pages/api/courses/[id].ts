import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import messages from '../../../utils/api-messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const httpMethod = req.method;
        const id = req.query.id as string

        if (httpMethod == 'GET') {
            const course = await prisma.course.findFirst({
                where: {id: id}
            });
            res.status(200).json({message: messages.getOneCourseSuccess, data: course});
        } else if (httpMethod == 'DELETE') {
            // DELETE COURSE
            const deleteCourse = await prisma.course.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json({message: messages.deleteCourseSuccess, data: deleteCourse});
        } else if (httpMethod == 'PUT') {
            // UPDATE NAME, DESCRIPTION, STARS
            const { name, description, stars, subcategoryId, price, status } = req.body
            const updatedCourse = await prisma.course.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                    price: price,
                    status: status,
                    subcategory: {
                        connect: {
                            id: subcategoryId
                        }
                    }
                },
            })
            res.status(200).json({message: messages.updateCourseSuccess, data: updatedCourse})
        } else {
            res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${httpMethod} not allowed`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
} 