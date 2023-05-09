import type { NextApiRequest, NextApiResponse } from 'next';
import { createMatchingGame, SerializedMatchingGame } from '../../../lib/server/matchingGame';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('quizGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const matchingGame = req.body as SerializedMatchingGame;
      // TODO: validate data

      const created = await createMatchingGame(matchingGame);
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
