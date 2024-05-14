import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { findUniqueUser, updateUser } from '../../../../lib/server/user';
import dayjs from 'dayjs';

const smtp: { host: string; port: number; user: string; pass: string } = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { args } = req.query;
  switch (args[0]) {
    case 'createOtp':
      await createOtp(args[1]);
      res.status(200).json({ status: 200 });
      break;
    case 'execute':
      const result = await execute(args[1], args[2], args[3]);
      if (result) {
        res.status(200).json({ status: 200 });
      } else {
        res.status(500).json({ error: 'Invalid otp' });
      }
      break;
  }
}

async function emailto(to: string, subject: string, html: string) {
  const from = process.env.EMAIL_FROM;
  const newTransport = () => {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
      tls: { rejectUnauthorized: false },
    });
  };
  const mailOptions = {
    from,
    to,
    subject,
    html: html,
  };
  const info = await newTransport().sendMail(mailOptions);
  console.log(nodemailer.getTestMessageUrl(info));
}

async function createOtp(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await updateUser(
    { email: email },
    {
      otp: otp,
    },
  );
  emailto(email, 'Account Deletion OTP', `<h1>Your OTP is <u><b>${otp}</b></u></h1>`).then();
  return true;
}

async function execute(email: string, otp: string, mode: string) {
  const { otp: correctOtp } = await findUniqueUser(
    { email: email },
    {
      otp: true,
    },
  );
  if (correctOtp === otp) {
    if (mode === '3') {
      await updateUser(
        { email: email },
        {
          otp: '',
          deleted: true,
        },
      );
      emailto(
        email,
        'Account Deletion Request',
        `We have received a request to permanently delete your account. 
                Your account has been deactivated from the site and will be permanently deleted within 14 days.`,
      ).then();
    }
    return true;
  } else {
    return false;
  }
}
