import type { NextApiRequest, NextApiResponse } from 'next';
import { CourseStructure, loadCourse, saveCourse } from '../../../../../lib/admin/courses/editcourse';
import messages from '../../../../../utils/api-messages';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const course = await loadCourse(id);
      res.status(200).json({ message: messages.loadCourseSuccess, data: course });
    } else if (httpMethod == 'PUT') {
      const course = JSON.parse(req.body) as CourseStructure;
      await saveCourse(course);
      res.status(200).json({ message: messages.saveCourseSuccess });
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    // TODO: replace these error messages with specific ones for GET, POST, PUT, DELETE
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default handler;
