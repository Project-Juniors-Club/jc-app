import type { NextApiRequest, NextApiResponse } from 'next';
import { createSortingGame, SerializedSortingGame } from '../../../lib/server/sortingGame';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('sortingGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const sortingGame = req.body as SerializedSortingGame;
      // TODO: validate data

      const created = await createSortingGame(sortingGame);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: created });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
};

export default handler;
