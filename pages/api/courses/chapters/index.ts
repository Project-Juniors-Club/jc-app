import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { Chapter } from '@prisma/client';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('chapter');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const { name, description, courseId, chapterNumber, userId }: Chapter & { userId: string } = req.body;
      // CREATE CHAPTER
      const [newChapter] = await prisma.$transaction([
        prisma.chapter.create({
          data: {
            name,
            description,
            chapterNumber,
            course: {
              connect: { id: courseId },
            },
          },
        }),
        prisma.course.update({
          where: {
            id: courseId,
          },
          data: {
            lastUpdatedBy: {
              connect: {
                userId: userId,
              },
            },
          },
        }),
      ]);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: newChapter });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
