import type { NextApiRequest, NextApiResponse } from 'next';
import { createSorting, findSorting, SerializedObjectBucketPair } from '../../../lib/server/sorting';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import validatePairs from '../../../utils/sorting-game-validator';

const entityMessageObj = entityMessageCreator('sortingGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const games = await findSorting();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: games });
    } else if (httpMethod == 'POST') {
      const { description, correctPairs }: { description: string; correctPairs: SerializedObjectBucketPair[] } = req.body;

      const result = validatePairs(correctPairs);
      if (!result.valid) {
        return res.status(400).end(`The input is not valid. ${result.message}`);
      }

      const created = await createSorting(description, correctPairs);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: created });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
};

export default handler;
