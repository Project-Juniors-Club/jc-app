import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getCourseStructure } from '../../../../lib/server/course';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('courseStructure');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const courseStructure = await getCourseStructure(id);

      res.status(200).json({ ...courseStructure });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
