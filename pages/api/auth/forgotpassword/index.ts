import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash, randomBytes } from 'node:crypto';
import nodemailer from 'nodemailer';
import prisma from '../../../../lib/prisma';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = _req.body;
    //TODO: change to API endpoint when getUser is ready
    const user = (await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
      },
    })) as User;
    const message = 'You will receive a reset email if user with that email exists.';
    if (!user) {
      return res.status(200).json({
        status: 'success',
        message,
      });
    }
    const resetToken = randomBytes(32).toString('hex');
    const passwordResetToken = createHash('sha256').update(resetToken).digest('hex');
    //TODO: change to API endpoint when updateUser is ready
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken,
        passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      select: { email: true },
    });
    try {
      //TODO: change to dynamic path based on config
      const url = `http://localhost:3000/api/auth/resetpassword/${resetToken}`;
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailData = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your password reset token (valid for 10 minutes).',
        text: url,
        html: `<a href=${url}>${url}</a>`,
      };
      const info = await transporter.sendMail(mailData);
      console.log(nodemailer.getTestMessageUrl(info));
      res.status(200).json({
        status: 'success',
        message,
      });
    } catch (err: any) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: null,
          passwordResetAt: null,
        },
      });
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email',
      });
    }
  } catch (err: any) {
    console.error(err);
  }
};

export default handler;
