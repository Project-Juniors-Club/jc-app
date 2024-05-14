import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { findUniqueUser, updateUser } from '../../../../lib/server/user';
import bcrypt from 'bcrypt';
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
    case 'otp':
      await createOtp(args[1]);
      res.status(200).json({ status: 200 });
      break;
    case 'set':
      const data = req.body;
      const result = await execute(args[1], args[2], data);
      if (result) {
        res.status(200).json({ status: 200 });
      } else {
        res.status(500).json({ error: 'Invalid otp' });
      }
      break;
  }
}

async function emailTo(to: string, subject: string, html: string) {
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

async function createOtp(uid: string) {
  const email = (await findUniqueUser({ id: uid }, { email: true })).email;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await updateUser(
    { id: uid },
    {
      otp: otp,
    },
  );
  emailTo(email, 'Account Update OTP', `<h1>Your OTP is <u><b>${otp}</b></u></h1>`).then();
  return true;
}

async function execute(uid: string, otp: string, { dob, fullName, newEmail, newPass }) {
  const { otp: correctOtp } = await findUniqueUser(
    { id: uid },
    {
      otp: true,
    },
  );
  if (correctOtp === otp && validateEmail(newEmail)) {
    const email = (await findUniqueUser({ id: uid }, { email: true })).email;
    emailTo(
      email,
      'Account Update Confirmation',
      `We have received a request to edit your account information. 
                Please contact us if this was not done by you.`,
    ).then();
    await updateUser(
      { id: uid },
      {
        otp: '',
        email: newEmail,
        dob: new Date(dob).toISOString(),
        name: sanitise(fullName),
      },
    );
    if (newPass !== '') {
      await updateUser(
        { id: uid },
        {
          password: bcrypt.hashSync(newPass, 10),
        },
      );
    }
    return true;
  } else {
    return false;
  }
}

function sanitise(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, match => map[match]);
}

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
