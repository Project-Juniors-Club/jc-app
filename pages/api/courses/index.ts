import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    try {
        const httpMethod = req.method;
        if (httpMethod == 'GET') {
            if (req.body.id == undefined) {
                // GET ALL COURSES
                const courses = await prisma.course.findMany();
                res.status(200).json(courses);
            } else {
                // GET BY ID
                const courses = await prisma.course.findFirst({
                    where: {id: req.body.id}
                });
                res.status(200).json(courses);
            }
        } else if (httpMethod == 'POST') {
            const { name, description, stars, adminId, userCourses, courseItems } = req.body
            // CREATE COURSE
            await prisma.course.create({
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                    adminId: adminId,
                    userCourses: userCourses,
                    courseItems: courseItems
                },
            })
        } else if (httpMethod == 'DELETE') {
            // DELETE COURSE
            const { id } = req.body
            const deleteCourse = await prisma.course.delete({
                where: {
                    id: id,
                },
            })
            res.status(200).json(deleteCourse);
        } else if (httpMethod == 'PUT') {
            // UPDATE NAME, DESCRIPTION, STARS, USERCOURSES, COURSEITEMS
            const { id, name, description, stars, userCourses, courseItems } = req.body
            const updateCourse = await prisma.course.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    description: description,
                    stars: stars,
                    userCourses: userCourses,
                    courseItems: courseItems
                },
            })
            res.status(200).json(updateCourse)
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${httpMethod} not allowed`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
} 