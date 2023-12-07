import type { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';
import { updateLastSeen, getRecentlyUsedCourse } from '../../../../lib/server/course';

const entityMessageObj = entityMessageCreator('courseRecent');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const { userId } = req.body;
      const courses = await getRecentlyUsedCourse(userId);
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: courses });
    } else if (httpMethod == 'POST') {
      const { userId, courseId } = req.body;
      // CREATE COURSE

      const updated = await updateLastSeen(userId, courseId);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: updated });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
