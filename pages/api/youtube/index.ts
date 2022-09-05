import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { v4 as uuidv4 } from 'uuid';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const videoTitle = req.body.videoTitle;
  try {
    const videoId = await YoutubeUpload(videoTitle);
    console.log(videoId);
    res.status(200).json({ videoId: videoId });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, videoId: 'O-yi0LBDi3s' });
  }
};

const YoutubeUpload = async (videoTitle: string) => {
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
  console.log(res.data);
  return res.data.id;
};

export default handler;
