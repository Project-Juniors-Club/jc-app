import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('course');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const courses = await prisma.course.findMany();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: courses });
    } else if (httpMethod == 'POST') {
      const { title, description, learningObjectives, coverImageAssetId, creatorId, price, categoryId, editorId, status } = req.body;
      // CREATE COURSE
      const dataToCreate = {
        data: {
          title: title,
          description: description,
          learningObjectives: learningObjectives,
          createdBy: {
            connect: {
              userId: creatorId,
            },
          },
          lastUpdatedBy: {
            connect: {
              userId: creatorId,
            },
          },
          price: price,
          status: status,
        },
      };
      if (coverImageAssetId) {
        dataToCreate.data['coverImage'] = {
          connect: {
            assetId: coverImageAssetId,
          },
        };
      }
      if (categoryId) {
        dataToCreate.data['category'] = {
          connect: {
            id: categoryId,
          },
        };
      }
      const created = await prisma.course.create(dataToCreate);

      if (editorId) {
        await prisma.courseEditor.create({
          data: {
            course: {
              connect: {
                id: created.id,
              },
            },
            admin: {
              connect: {
                userId: editorId,
              },
            },
          },
        });
      }

      res.status(200).json({ message: entityMessageObj.createSuccess, data: created });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
