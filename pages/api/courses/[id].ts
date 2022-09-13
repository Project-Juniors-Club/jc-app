import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const httpMethod = req.method;
        const id = req.query.id as string

        if (httpMethod == 'GET') {
            const course = await prisma.course.findFirst({
                where: {id: id}
            });
            res.status(200).json(course);
        } else if (httpMethod == 'DELETE') {
            // DELETE COURSE
            const deleteCourse = await prisma.course.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(deleteCourse);
        } else if (httpMethod == 'PUT') {
            // UPDATE NAME, DESCRIPTION, STARS
            const { name, description, stars } = req.body
            const updateCourse = await prisma.course.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                },
            })
            res.status(200).json({name: name, description: description, stars: stars})
        } else {
            res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${httpMethod} not allowed`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
} 