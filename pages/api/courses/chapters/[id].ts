import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('chapter');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const chapterId = req.query.id as string;

    if (httpMethod == 'GET') {
      const chapter = await prisma.chapter.findFirst({
        where: { id: chapterId },
      });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: chapter });
    } else if (httpMethod == 'DELETE') {
      // DELETE COURSE
      const chapter = await prisma.chapter.delete({
        where: {
          id: chapterId,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: chapter });
    } else if (httpMethod == 'PUT') {
      // UPDATE TITLE, DESCRIPTION
      const { name, description, updaterId, courseId } = req.body;
      const updatedChapter = await prisma.chapter.update({
        where: {
          id: chapterId,
        },
        data: {
          name: name,
          description: description,
          course: {
            update: {
              lastUpdatedUserId: updaterId,
            },
          },
        },
      });
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedChapter });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
