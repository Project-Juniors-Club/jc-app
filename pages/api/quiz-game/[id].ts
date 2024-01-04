import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteQuiz, findUniqueQuiz, updateQuiz, SerializedQuizQuestion } from '../../../lib/server/quiz';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import validateQuestions from '../../../utils/quizGameValidator';

const entityMessageObj = entityMessageCreator('quizGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const gameId = req.query.id as string;

    if (httpMethod == 'GET') {
      const game = await findUniqueQuiz({ gameId });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: game });
    } else if (httpMethod == 'DELETE') {
      const deletedGame = await deleteQuiz({ gameId });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deletedGame });
    } else if (httpMethod == 'PUT') {
      const { quizGameQuestions }: { quizGameQuestions: SerializedQuizQuestion[] } = req.body;

      const result = validateQuestions(quizGameQuestions);
      if (!result.valid) {
        return res.status(400).end(`The input is not valid. ${result.message}`);
      }

      const updatedGame = await updateQuiz(
        { gameId },
        {
          quizGameQuestions: {
            deleteMany: {}, // TODO: this should be a proper cleanup, to remove items from the S3, take care not to delete reused images
            create: quizGameQuestions.map(question => ({
              questionNumber: question.questionNumber,
              isMultipleResponse: question.isMultipleResponse,
              questionTitle: question.text,
              image: question?.image?.assetId
                ? {
                    connect: {
                      assetId: question.image.assetId,
                    },
                  }
                : undefined,
              quizGameOptions: {
                create: question.options.map(option => ({
                  isCorrectOption: option.isCorrect,
                  quizGameOptionType: option.type,
                  optionText: option.text,
                  optionImage: option?.image?.assetId && {
                    connect: {
                      assetId: option.image.assetId,
                    },
                  },
                })),
              },
            })),
          },
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
