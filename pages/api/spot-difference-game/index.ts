import type { NextApiRequest, NextApiResponse } from 'next';
import { createSpotTheDifferenceGameWithDifferences, findSpotTheDiff } from '../../../lib/server/spotTheDifference';
import validateDifferences from './spotTheDifferenceValidator';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('spotTheDifferenceGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const games = await findSpotTheDiff();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: games });
    } else if (httpMethod == 'POST') {
      const { leftImageId, rightImageId, differences } = req.body;
      const result = validateDifferences(differences);
      if (!result.valid) {
        return res.status(400).end(`The input is not valid. ${result.message}`);
      }

      const created = await createSpotTheDifferenceGameWithDifferences(rightImageId, leftImageId, differences);
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
