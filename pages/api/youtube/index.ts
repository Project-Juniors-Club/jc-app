import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { v4 as uuidv4 } from 'uuid';
import { entityMessageCreator } from '../../../utils/api-messages';
import { errorMessageHandler } from '../../../utils/error-message-handler';

const entityMessageObj = entityMessageCreator('videoUpload');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const httpMethod = req.method;
    if (httpMethod == 'POST') {
      const videoTitle = req.body.videoTitle;
      const videoId = await youtubeUpload(videoTitle);
      res.status(200).json({ message: entityMessageObj.createSuccess, data: videoId });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${httpMethod} not allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: errorMessageHandler({ httpMethod: req.method }, entityMessageObj) });
  }
};

const youtubeUpload = async (videoTitle: string) => {
  const uniqueVideoTitle = videoTitle + ' ' + uuidv4();
  const youtube = google.youtube('v3');
  const fileName = path.join(__dirname, '../../../../pages/api/youtube/example_video.mp4');

  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../../../../client_secret.json'),
    scopes: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube'],
  });
  google.options({ auth });

  const fileSize = fs.statSync(fileName).size;
  const res = await youtube.videos.insert(
    {
      part: ['id', 'snippet', 'status'],
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: uniqueVideoTitle,
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    {
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    },
  );
  return res.data.id;
};

export default handler;
