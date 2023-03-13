import type { NextApiRequest, NextApiResponse } from 'next';
import { createQuiz, findQuiz, SerializedQuizQuestion } from '../../../lib/server/quiz';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import validateQuestions from '../../../utils/quizGameValidator';

const entityMessageObj = entityMessageCreator('quizGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const games = await findQuiz();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: games });
    } else if (httpMethod == 'POST') {
      const { quizGameQuestions }: { quizGameQuestions: SerializedQuizQuestion[] } = req.body;

      const result = validateQuestions(quizGameQuestions);
      if (!result.valid) {
        return res.status(400).end(`The input is not valid. ${result.message}`);
      }

      const created = await createQuiz(quizGameQuestions);
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
