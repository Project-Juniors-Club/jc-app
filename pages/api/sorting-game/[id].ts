import type { NextApiRequest, NextApiResponse } from 'next';
import { findUniqueSortingGame, updateSortingGame, deleteSortingGame, SerializedSortingGame } from '../../../lib/server/sortingGame';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('sortingGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const gameId = req.query.id as string;

    if (httpMethod === 'GET') {
      const sortingGame = await findUniqueSortingGame(gameId);
      if (!sortingGame) {
        res.status(404).json({ message: entityMessageObj.getOneFailed });
      } else {
        res.status(200).json({ message: entityMessageObj.getOneSuccess, data: sortingGame });
      }
    } else if (httpMethod === 'PUT') {
      const sortingGame: SerializedSortingGame = req.body;

      const updatedGame = await updateSortingGame(gameId, sortingGame);
      res.status(200).json({ message: entityMessageObj.updateSuccess, data: updatedGame });
    } else if (httpMethod === 'DELETE') {
      await deleteSortingGame(gameId);
      res.status(200).json({ message: entityMessageObj.deleteSuccess });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method, isSingleEntity: true }, entityMessageObj) });
  }
};

export default handler;
