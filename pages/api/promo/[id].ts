import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('promo');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const httpMethod = req.method;

    if (httpMethod == 'POST') {
      try {
        const { id, code, discount, startDate, endDate } = req.body;
        let obj: any = { code, discount };
        obj.startDate = new Date(startDate);
        obj.endDate = new Date(endDate);

        const updatedPromo = await prisma.promo.update({
          where: {
            id: id,
          },
          data: {
            ...obj,
          },
        });

        return res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedPromo });
      } catch (error) {
        return { message: errorMessageHandler({ httpMethod: 'POST', isSingleEntity: true }, entityMessageObj) };
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
}
