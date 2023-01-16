import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { entityMessageCreator } from '../../../../utils/api-messages';
import { Chapter, Page } from '@prisma/client';
import { errorMessageHandler } from '../../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('page');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const {
        chapterId,
        name,
        pageNumber,
        description,
        duration,
        assetType,
        userId,
        courseId,
      }: Page & { userId: string; courseId: string } = req.body;
      // CREATE PAGE
      const [newPage] = await prisma.$transaction([
        prisma.page.create({
          data: {
            name,
            pageNumber,
            description,
            duration,
            assetType,
            Chapter: {
              connect: {
                id: chapterId,
              },
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
      res.status(200).json({ message: entityMessageObj.createSuccess, data: newPage });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
