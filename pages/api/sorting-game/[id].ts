import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteSorting, findUniqueSorting, updateSorting, SerializedObjectBucketPair } from '../../../lib/server/sorting';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';
import validatePairs from '../../../utils/sorting-game-validator';

const entityMessageObj = entityMessageCreator('sortingGame');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    const gameId = req.query.id as string;

    if (httpMethod == 'GET') {
      const game = await findUniqueSorting({ gameId });
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: game });
    } else if (httpMethod == 'DELETE') {
      const deletedGame = await deleteSorting({ gameId });
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: deletedGame });
    } else if (httpMethod == 'PUT') {
      const { description, correctPairs }: { description: string; correctPairs: SerializedObjectBucketPair[] } = req.body;

      // const result = validatePairs(correctPairs);
      // if (!result.valid) {
      //   return res.status(400).end(`The input is not valid. ${result.message}`);
      // }

      const updatedGame = await updateSorting(
        { gameId },
        {
          description,
          correctPairs: {
            create: correctPairs.map(pair => ({
              objects: {
                create: pair.objects.map(object => ({
                  objectType: object.objectType,
                  text: object.text,
                  image: object.imageId && {
                    connect: {
                      assetId: object.imageId,
                    },
                  },
                })),
              },
              bucket: pair.bucket
                ? {
                    create: {
                      description: pair.bucket.description,
                    },
                  }
                : null,
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
