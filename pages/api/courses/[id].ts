import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('course');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    const id = req.query.id as string;

    if (httpMethod == 'GET') {
      const course = await prisma.course.findFirst({
        where: { id: id },
        include: {
          createdBy: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          lastUpdatedBy: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const result = {
        ...course,
        price: course.price.toString(),
        createDate: course.createDate.toLocaleDateString(),
        lastUpdatedDate: course.createDate.toLocaleDateString(),
      };
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: result });
    } else if (httpMethod == 'DELETE') {
      // DELETE COURSE
      const deleteCourse = await prisma.course.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deleteCourse });
    } else if (httpMethod == 'PUT') {
      // UPDATE TITLE, DESCRIPTION
      const { title, description, learningObjectives, coverImageAssetId, updaterId, price, categoryId, status, coverImageRemoved } =
        req.body;
      const updatedCourse = await prisma.course.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          description: description,
          learningObjectives: learningObjectives,
          lastUpdatedBy: {
            connect: {
              userId: updaterId,
            },
          },
          coverImage: coverImageAssetId
            ? {
                connect: { assetId: coverImageAssetId },
              }
            : coverImageRemoved
            ? {
                disconnect: true,
              }
            : undefined,
          category: categoryId
            ? {
                connect: categoryId,
              }
            : undefined,
          price: price,
          status: status,
        },
      });

      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedCourse });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
