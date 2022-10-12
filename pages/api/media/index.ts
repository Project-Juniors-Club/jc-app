import { NextApiRequest, NextApiResponse } from "next";
import messages from '../../../utils/api-messages';
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
    region: "ap-southeast-1",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: "v4",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.body.name,
        Expires: 120,
        ContentType: req.body.type,
    }

    try {
        if (method === 'GET') {
            const url = await s3.getSignedUrlPromise("getObject", fileParams);
            // res.status(200).json({message: messages.getFilesSuccess})
            res.status(200).json({ url })
        } else if (method === 'PUT') {
            const url = await s3.getSignedUrlPromise("putObject", fileParams);
            // res.status(200).json({message: messages.uploadFileSuccess})
            res.status(200).json({ url })
        } else if (method === 'DELETE') {
            const url = await s3.getSignedUrlPromise("deleteObject", fileParams);
            // res.status(200).json({message: messages.deleteFileSuccess})
            res.status(200).json({ url })
        } else {
            res.status(405).end(`Method ${method} not allowed`)
        }
    } catch(err) {
        console.log(err);
        if (method == 'GET') {
            res.status(500).json({message: messages.getFilesFailed})
        } else if (method == 'POST') {
            res.status(500).json({message: messages.uploadFileFailed})
        } else if (method == 'DELETE') {
            res.status(500).json({message: messages.deleteFileFailed})
        } else {
            res.status(500).end(`Method ${method} failed`)
        }
    }
}