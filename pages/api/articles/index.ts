import type { NextApiRequest, NextApiResponse } from 'next';
import { findArticles, createArticle } from '../../../lib/server/article';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('article');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'GET') {
      const articles = await findArticles();
      res.status(200).json({ message: entityMessageObj.getAllSuccess, data: articles });
    } else if (httpMethod == 'POST') {
      const { text } = req.body;
      const created = await createArticle(text);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: created });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    // TODO: replace these error messages with specific ones for GET, POST, PUT, DELETE
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
};

export default handler;
