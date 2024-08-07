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
          courseEditor: {
            select: {
              adminId: true,
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
    } else if (httpMethod == 'POST') {
      try {
        const { id, status } = req.body;
        if (status === 'APPROVED' || status === 'ARCHIVED' || status == 'DRAFT') {
          const updatedCourse = await prisma.course.update({
            where: {
              id: id,
            },
            data: {
              status: status,
            },
          });

          return res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedCourse });
        } else {
          return { message: 'Invalid status. Allowed values are "APPROVED" or "ARCHIVED".' };
        }
      } catch (error) {
        console.log(error);
        return { message: errorMessageHandler({ httpMethod: 'PUT', isSingleEntity: true }, entityMessageObj) };
      }
    } else if (httpMethod == 'DELETE') {
      // DELETE COURSE
      const deleteCourse = async () => {
        try {
          await prisma.courseEditor.deleteMany({
            where: {
              courseId: id,
            },
          });

          await prisma.userCourse.deleteMany({
            where: {
              courseId: id,
            },
          });

          await prisma.asset.deleteMany({
            where: {
              page: {
                chapter: {
                  courseId: id,
                },
              },
            },
          });

          await prisma.page.deleteMany({
            where: {
              chapter: {
                courseId: id,
              },
            },
          });

          await prisma.chapter.deleteMany({
            where: {
              courseId: id,
            },
          });

          const course = await prisma.course.findUnique({
            where: {
              id: id,
            },
            select: {
              coverImageAssetId: true, // Select only the coverImageAssetId
            },
          });

          if (course && course.coverImageAssetId) {
            await prisma.image.delete({
              where: {
                assetId: course.coverImageAssetId, // Use the coverImageAssetId to delete the image
              },
            });
          }

          await prisma.course.delete({
            where: {
              id: id,
            },
          });
          return res.status(200).json({ message: entityMessageObj.deleteSuccess });
        } catch (error) {
          return res.status(500).json({ message: 'Failed to delete course' });
        }
      };
      deleteCourse();
    } else if (httpMethod == 'PUT') {
      // UPDATE TITLE, DESCRIPTION
      const {
        title,
        description,
        learningObjectives,
        coverImageAssetId,
        updaterId,
        price,
        categoryId,
        editorId,
        status,
        coverImageRemoved,
      } = req.body;
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
                connect: { id: categoryId },
              }
            : undefined,
          price: price,
          status: status,
        },
        include: {
          courseEditor: true,
        },
      });

      if (editorId) {
        await prisma.courseEditor.update({
          where: {
            id: updatedCourse.courseEditor.find(courseEditorElement => courseEditorElement.courseId == id).id,
          },
          data: {
            adminId: editorId,
          },
        });
      }

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
