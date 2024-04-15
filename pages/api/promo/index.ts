import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('promo');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const { courseId, code, discount, startDate, endDate } = req.body;
      console.log(req.body);
      // CREATE Promo
      const dataToCreate = {
        data: {
          code: code,
          discount: discount,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          course: { connect: { id: courseId } },
        },
      };
      const created = await prisma.promo.create(dataToCreate);

      res.status(200).json({ message: entityMessageObj.createSuccess, data: created });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
}
