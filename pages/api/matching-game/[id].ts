import type { NextApiRequest, NextApiResponse } from 'next';
import { findUniqueMatchingGame, SerializedMatchingGame, updateMatchingGame } from '../../../lib/server/matchingGame';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('matchingGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const gameId = req.query.id as string;

    // TODO: GET, DELETE
    if (httpMethod == 'PUT') {
      const matchingGame: SerializedMatchingGame = req.body;

      const updatedGame = await updateMatchingGame(gameId, matchingGame);
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedGame });
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
};

export default handler;
