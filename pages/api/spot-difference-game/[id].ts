import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteSpotTheDiff, findUniqueSpotTheDiff, updateSpotTheDiff } from '../../../lib/server/spotTheDifference';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import validateDifferences from './spotTheDifferenceValidator';

const entityMessageObj = entityMessageCreator('spotTheDifferenceGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const gameId = req.query.id as string;

    if (httpMethod == 'GET') {
      const game = await findUniqueSpotTheDiff({ gameId });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: game });
    } else if (httpMethod == 'DELETE') {
      const deletedGame = await deleteSpotTheDiff({ gameId });
      res.status(200).json({ message: entityMessageObj.deleteSuccess });
    } else if (httpMethod == 'PUT') {
      const { leftImageId, rightImageId, differences } = req.body;
      const result = validateDifferences(differences);
      if (!result.valid) {
        return res.status(400).end(`The input is not valid. ${result.message}`);
      }

      const updatedGame = await updateSpotTheDiff(
        { gameId },
        {
          leftImage: {
            connect: {
              assetId: leftImageId,
            },
          },
          rightImage: {
            connect: {
              assetId: rightImageId,
            },
          },
          differences: differences,
        },
      );
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedGame });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
};

export default handler;
