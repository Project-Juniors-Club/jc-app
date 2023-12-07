import type { NextApiRequest, NextApiResponse } from 'next';
import { addCourseToCart, checkCourseInCart, deleteCourseToCart } from '../../../lib/server/course';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('cart');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const { userId } = req.body;
      const course = await checkCourseInCart(userId, id);
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: course });
    } else if (httpMethod == 'POST') {
      const { userId } = req.body;
      const course = await addCourseToCart(userId, id);
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: course });
    } else if (httpMethod == 'DELETE') {
      const { userId } = req.body;
      const deleteCourse = await deleteCourseToCart(userId, id);
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deleteCourse });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
