import { NextApiRequest, NextApiResponse } from 'next';
import { entityMessageCreator } from '../../../utils/api-messages';
import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';

const entityMessageObj = entityMessageCreator('file');

const s3 = new S3({
  region: 'ap-southeast-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: 'v4',
});

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  const fileParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.body.name,
    Expires: 120,
    ContentType: req.body.type,
  };

  const getFileParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.body,
    Expires: 120,
  };

  try {
    if (method === 'GET') {
      // for postman usage only
      const url = await s3.getSignedUrlPromise('getObject', getFileParams);
      const result = await axios.get(url);
      res.status(200).json({ message: entityMessageObj.getOneSuccess, data: result });
    } else if (method === 'PUT') {
      // for "uploads/upload" use
      const url = await s3.getSignedUrlPromise('putObject', fileParams);
      const data = await axios.put(url, {
        headers: {
          'Content-type': req.body.type,
          'Access-Control-Allow-Origin': '*',
        },
      });
      res.status(200).json({ message: entityMessageObj.createSuccess, data: fileParams });
    } else if (method === 'DELETE') {
      // for postman usage only
      const url = await s3.getSignedUrlPromise('deleteObject', getFileParams);
      const result = await axios.delete(url);
      res.status(200).json({ message: entityMessageObj.deleteSuccess, data: fileParams });
    } else {
      res.status(405).end(`Method ${method} not allowed`);
    }
  } catch (err) {
    console.log(err);
    if (method == 'GET') {
      res.status(500).json({ message: entityMessageObj.getOneFailed });
    } else if (method == 'POST') {
      res.status(500).json({ message: entityMessageObj.createFailed });
    } else if (method == 'DELETE') {
      res.status(500).json({ message: entityMessageObj.deleteFailed });
    } else {
      res.status(500).end(`Method ${method} failed`);
    }
  }
}
